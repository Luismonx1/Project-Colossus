// Integridade do vínculo entre pontos persistidos e entradas do guia em vídeo.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {} });
for (const file of ['mapa-collectibles.js', 'mapa-coins-video.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'Scripts', file), 'utf8'), context);
}
const coins = context.window.colossusCollectibles.filter(item => item.type === 'coins');
const guide = context.window.colossusCoinGuide;
const corrections = { 1: 'F0', 8: 'G1', 31: 'C4' };
assert.equal(coins.length, 79, 'O atlas deve conter 79 moedas');
assert.equal(guide.length, 79, 'O guia deve conter 79 entradas');
assert.equal(new Set(coins.map(item => item.id)).size, 79, 'IDs do atlas repetidos');
assert.equal(new Set(guide.map(item => item.pointId)).size, 79, 'Ponto associado a mais de um trecho');
assert.equal(new Set(guide.map(item => item.number)).size, 79, 'Número do vídeo repetido');
for (const [index, entry] of guide.entries()) {
  const point = coins.find(item => item.id === entry.pointId);
  assert.ok(point, `Moeda ${entry.number}: ponto inexistente`);
  assert.equal(entry.number, index + 1, 'Numeração do vídeo incompleta ou fora de ordem');
  assert.equal(entry.coord, corrections[point.id] || point.coord, `Moeda ${entry.number}: quadrante divergente`);
  assert.ok(Number.isInteger(entry.time) && entry.time > 0, 'Tempo inválido');
  if (index) assert.ok(entry.time > guide[index - 1].time, 'Tempos fora de ordem');
  assert.ok(typeof entry.hint === 'string' && entry.hint.trim().length > 15, `Moeda ${entry.number}: falta dica`);
}
console.log('79 moedas: cobertura completa, associações únicas, quadrantes e tempos consistentes.');
