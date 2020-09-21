'use strict';

const transformStateWithClones = require('./transformStateWithClones');

test('Should create a new object with a single added property', () => {
  const state = {};

  expect(transformStateWithClones(state, [
    {
      operation: 'addProperties', properties: { name: 'Jim' },
    },
  ]))
    .toEqual([
      { name: 'Jim' },
    ]);

  expect(state)
    .toEqual({});
});

test('Should create a new object with multiple added properties', () => {
  const state = {};

  expect(transformStateWithClones(state, [
    {
      operation: 'addProperties',
      properties: {
        name: 'Jim', hello: 'world',
      },
    },
  ]))
    .toEqual([
      {
        name: 'Jim', hello: 'world',
      },
    ]);

  expect(state)
    .toEqual({});
});

test('Should combine old properties with added ones', () => {
  const state = {
    foo: 'bar', bar: 'foo',
  };

  expect(transformStateWithClones(state, [
    {
      operation: 'addProperties',
      properties: {
        name: 'Jim', hello: 'world',
      },
    },
  ]))
    .toEqual([
      {
        foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
      },
    ]);

  expect(state)
    .toEqual({
      foo: 'bar', bar: 'foo',
    });
});

test('Should use the latest value when adding an existent property', () => {
  const state = {
    foo: 'bar', bar: 'foo',
  };

  expect(transformStateWithClones(state, [
    {
      operation: 'addProperties',
      properties: {
        foo: 'new', hello: 'world',
      },
    },
  ]))
    .toEqual([
      {
        foo: 'new', bar: 'foo', hello: 'world',
      },
    ]);

  expect(state)
    .toEqual({
      foo: 'bar', bar: 'foo',
    });
});

test('Should create an empty object when removing the last property', () => {
  const state = { foo: 'bar' };

  expect(transformStateWithClones(state, [
    {
      operation: 'removeProperties', properties: ['foo'],
    },
  ]))
    .toEqual([{}]);

  expect(state)
    .toEqual({ foo: 'bar' });
});

test('Should create an object without removed properties', () => {
  const state = {
    foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
  };

  expect(transformStateWithClones(state, [
    {
      operation: 'removeProperties', properties: ['hello', 'foo', 'name'],
    },
  ]))
    .toEqual([
      { bar: 'foo' },
    ]);

  expect(state)
    .toEqual({
      foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
    });
});

test('Should create the same state when removing no properties', () => {
  const state = {
    foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
  };

  expect(transformStateWithClones(state, [
    {
      operation: 'removeProperties', properties: [],
    },
  ]))
    .toEqual([
      {
        foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
      },
    ]);

  expect(state)
    .toEqual({
      foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
    });
});

test('Should not fail when removing not existing property', () => {
  const state = {
    foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
  };

  expect(transformStateWithClones(state, [
    {
      operation: 'removeProperties', properties: ['test', 'bar'],
    },
  ]))
    .toEqual([
      {
        foo: 'bar', name: 'Jim', hello: 'world',
      },
    ]);

  expect(state)
    .toEqual({
      foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
    });
});

test('Should create an empty object after clear', () => {
  const state = {
    foo: 'bar', name: 'Jim', another: 'one',
  };

  expect(transformStateWithClones(state, [
    { operation: 'clear' },
  ]))
    .toEqual([{}]);

  expect(state)
    .toEqual({
      foo: 'bar', name: 'Jim', another: 'one',
    });
});

test('Should not fails when calling clear for an empty state', () => {
  const state = {};

  transformStateWithClones(state, [
    { operation: 'clear' },
  ]);

  expect(state)
    .toEqual({});
});

test('Should handle multiple operations', () => {
  const state = {
    foo: 'bar', bar: 'foo',
  };

  expect(transformStateWithClones(state, [
    {
      operation: 'addProperties',
      properties: {
        name: 'Jim', hello: 'world',
      },
    },
    {
      operation: 'removeProperties', properties: ['bar', 'hello'],
    },
    {
      operation: 'addProperties', properties: { another: 'one' },
    },
  ]))
    .toEqual([
      {
        foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world',
      },
      {
        foo: 'bar', name: 'Jim',
      },
      {
        foo: 'bar', name: 'Jim', another: 'one',
      },
    ]);

  expect(state)
    .toEqual({
      foo: 'bar', bar: 'foo',
    });
});

test('Should handle a long list of operations', () => {
  const state = {
    foo: 'bar', name: 'Jim', another: 'one',
  };

  expect(transformStateWithClones(state, [
    {
      operation: 'removeProperties', properties: ['another'],
    },
    { operation: 'clear' },
    { operation: 'clear' },
    { operation: 'clear' },
    {
      operation: 'addProperties', properties: { yet: 'another property' },
    },
    { operation: 'clear' },
    {
      operation: 'addProperties',
      properties: {
        foo: 'bar', name: 'Jim',
      },
    },
    {
      operation: 'removeProperties', properties: ['name', 'hello'],
    },
  ]))
    .toEqual([
      {
        foo: 'bar', name: 'Jim',
      },
      {},
      {},
      {},
      { yet: 'another property' },
      {},
      {
        foo: 'bar', name: 'Jim',
      },
      { foo: 'bar' },
    ]);

  expect(state)
    .toEqual({
      foo: 'bar', name: 'Jim', another: 'one',
    });
});
