'use strict';

const transformStateWithClones = require('./transformStateWithClones');

test('Non-empty initial state, adding and removing properties', () => {
  const state = { foo: 'bar', bar: 'foo' };

  expect(transformStateWithClones(state, [
    { operation: 'addProperties', properties: { name: 'Jim', hello: 'world' } },
    { operation: 'removeProperties', properties: ['bar', 'hello'] },
    { operation: 'addProperties', properties: { another: 'one' } },
  ]))
    .toEqual([
      { foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world' },
      { foo: 'bar', name: 'Jim' },
      { foo: 'bar', name: 'Jim', another: 'one' },
    ]);

  expect(state)
    .toEqual({ foo: 'bar', bar: 'foo' });
});

test('Non-empty initial state, adding and clearing properties', () => {
  const state = { foo: 'bar', bar: 'foo' };

  const result = transformStateWithClones(state, [
    { operation: 'addProperties', properties: { yet: 'another property' } },
    { operation: 'clear' },
    { operation: 'addProperties', properties: { foo: 'bar', name: 'Jim' } },
  ]);

  expect(result)
    .toEqual([
      { foo: 'bar', bar: 'foo', yet: 'another property' },
      {},
      { foo: 'bar', name: 'Jim' },
    ]);

  expect(state)
    .toEqual({ foo: 'bar', bar: 'foo' });
});

test('Removing the only property from the state', () => {
  const state = { foo: 'bar' };
  expect(transformStateWithClones(state, [
    { operation: 'removeProperties', properties: ['foo'] },
  ]))
    .toEqual([{}]);
  expect(state)
    .toEqual({ foo: 'bar' });
});

test('Adding a property to an empty state', () => {
  const state = {};
  expect(transformStateWithClones(state, [
    { operation: 'addProperties', properties: { 'foo': 'bar' } },
  ]))
    .toEqual([{ 'foo': 'bar' }]);
  expect(state)
    .toEqual({});
});
