const transform = require('../src/transformStateWithClones');

test('Example 1', () => {
  const state = { foo: 'bar', bar: 'foo' };
  const actions = [
    { type: 'addProperties', extraData: { name: 'Jim', hello: 'world' } },
    { type: 'removeProperties', keysToRemove: ['bar', 'hello'] },
    { type: 'addProperties', extraData: { another: 'one' } },
  ];
  expect(transform(state, actions)).toEqual([
    { foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world' },
    { foo: 'bar', name: 'Jim' },
    { foo: 'bar', name: 'Jim', another: 'one' },
  ]);
});

test('Example 2', () => {
  const state = { foo: 'bar', bar: 'foo' };
  const actions = [
    { type: 'addProperties', extraData: { yet: 'another property' } },
    { type: 'clear' },
    { type: 'addProperties', extraData: { foo: 'bar', name: 'Jim' } },
  ];
  expect(transform(state, actions)).toEqual([
    { foo: 'bar', bar: 'foo', yet: 'another property' },
    {},
    { foo: 'bar', name: 'Jim' },
  ]);
});

test('Initial state is not mutated', () => {
  const state = { a: 1 };
  const actions = [{ type: 'clear' }];
  transform(state, actions);
  expect(state).toEqual({ a: 1 });
});
