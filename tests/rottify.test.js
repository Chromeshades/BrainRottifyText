const test = require('node:test');
const assert = require('node:assert');
const { rottifyText } = require('../index');

test('basic rottification', async (t) => {
  const result = rottifyText('Hello world');
  assert.ok(result.length > 0, 'Should return a non-empty string');
});

test('random generation', async (t) => {
  const result = rottifyText();
  assert.ok(result.length > 0, 'Should generate random text');
});

test('rot level validation', async (t) => {
  const result = rottifyText('test', { rotLevel: 15 });
  // Should default to level 5 when outside valid range
  assert.ok(result.length > 0, 'Should handle invalid rot levels');
});

test('slang inclusion', async (t) => {
  const input = 'test';
  const result = rottifyText(input, {
    rotLevel: 10,
    includeSlang: ['GenZ']
  });
  // Check if result is longer than input (indicating slang was added)
  assert.ok(result.length > input.length, 'Should include additional slang');
  // Also verify the result is different from input
  assert.notStrictEqual(result, input, 'Should modify the input text');
});