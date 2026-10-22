const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { once } = require('node:events');
const fs = require('node:fs/promises');
const path = require('node:path');
const pdf2img = require('pdf2img');

test('the actual upload server accepts a synthetic file and survives malformed multipart input', { timeout: 10000 }, async () => {
  const root = path.join(__dirname, '..');
  await fs.mkdir(path.join(root, 'artifacts'), { recursive: true });
  const fixture = await fs.mkdtemp(path.join(root, 'artifacts', 'upload-test-'));
  await fs.cp(path.join(root, 'api'), path.join(fixture, 'api'), { recursive: true });
  await fs.mkdir(path.join(fixture, 'public/uploads'), { recursive: true });
  const originalDirectory = process.cwd();
  const originalConvert = pdf2img.convert;
  const originalListen = http.Server.prototype.listen;
  let server;
  let converted = false;
  pdf2img.convert = (filename, callback) => {
    assert.ok(path.resolve(filename).startsWith(fixture + path.sep));
    converted = true;
    callback(null, { message: [{ path: 'synthetic-output.png' }] });
  };
  http.Server.prototype.listen = function () {
    server = this;
    return originalListen.call(this, 0, '127.0.0.1');
  };
  try {
    process.chdir(fixture);
    try { require(path.join(fixture, 'api/upload.js')); }
    finally { http.Server.prototype.listen = originalListen; }
    if (!server.listening) await once(server, 'listening');
    const url = 'http://127.0.0.1:' + server.address().port + '/upload';
    const empty = await fetch(url, { method: 'POST' });
    assert.equal(empty.status, 400);
    const fields = new FormData();
    fields.set('description', 'synthetic fixture with no file');
    assert.equal((await fetch(url, { method: 'POST', body: fields })).status, 400);
    const malformed = await fetch(url, { method: 'POST', headers: { 'content-type': 'multipart/form-data' }, body: 'missing boundary' });
    assert.ok(malformed.status >= 400);
    const file = new FormData();
    file.set('file', new Blob(['%PDF-1.4\n%%EOF'], { type: 'application/pdf' }), 'fixture.pdf');
    const accepted = await fetch(url, { method: 'POST', body: file });
    assert.equal(accepted.status, 200);
    const result = await accepted.json();
    assert.equal(result.status, true);
    assert.equal(result.numPages, 1);
    assert.deepEqual(result.images, ['synthetic-output.png']);
    assert.equal(converted, true);
    const after = await fetch(url, { method: 'POST' });
    assert.equal(after.status, 400);
    assert.equal((await after.json()).status, false);
  } finally {
    http.Server.prototype.listen = originalListen;
    pdf2img.convert = originalConvert;
    process.chdir(originalDirectory);
    if (server) {
      server.closeAllConnections();
      await new Promise(resolve => server.close(resolve));
    }
  }
});
