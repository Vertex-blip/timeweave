import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
test('manifest has scoped navigation and install icons',()=>{const m=JSON.parse(fs.readFileSync(new URL('manifest.webmanifest',root)));assert.equal(m.scope,'./');assert.equal(m.start_url,'./');assert.equal(m.display,'standalone');for(const icon of m.icons){const bytes=fs.readFileSync(new URL(icon.src,root));assert.equal(bytes.subarray(1,4).toString(),'PNG');const size=Number(icon.sizes.split('x')[0]);assert.equal(bytes.readUInt32BE(16),size);assert.equal(bytes.readUInt32BE(20),size);}});
test('service worker precaches real local resources',()=>{const sw=fs.readFileSync(new URL('sw.js',root),'utf8');const files=JSON.parse(sw.match(/const FILES=(\[[^;]+\])/)[1].replaceAll("'",'"'));for(const file of files)assert.ok(fs.existsSync(new URL(file,root)),file);assert.ok(sw.includes('k.startsWith(PREFIX)'));});
