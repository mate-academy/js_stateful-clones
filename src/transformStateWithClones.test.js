'use strict';

const transformStateWithClones = require('./transformStateWithClones');

test('Should create a new object with a single added property', () => {
  const state = {};

  expect(transformStateWithClones(state, [
    {
      type: 'addProperties', extraData: { name: 'Jim' },
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
      type: 'addProperties',
      extraData: {
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
      type: 'addProperties',
      extraData: {
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
      type: 'addProperties',
      extraData: {
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
      type: 'removeProperties', keysToRemove: ['foo'],
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
      type: 'removeProperties', keysToRemove: ['hello', 'foo', 'name'],
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
      type: 'removeProperties', keysToRemove: [],
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
      type: 'removeProperties', keysToRemove: ['test', 'bar'],
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
    { type: 'clear' },
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
    { type: 'clear' },
  ]);

  expect(state)
    .toEqual({});
});

test('Should handle multiple types', () => {
  const state = {
    foo: 'bar', bar: 'foo',
  };

  expect(transformStateWithClones(state, [
    {
      type: 'addProperties',
      extraData: {
        name: 'Jim', hello: 'world',
      },
    },
    {
      type: 'removeProperties', keysToRemove: ['bar', 'hello'],
    },
    {
      type: 'addProperties', extraData: { another: 'one' },
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

test('Should handle a long list of types', () => {
  const state = {
    foo: 'bar', name: 'Jim', another: 'one',
  };

  expect(transformStateWithClones(state, [
    {
      type: 'removeProperties', keysToRemove: ['another'],
    },
    { type: 'clear' },
    { type: 'clear' },
    { type: 'clear' },
    {
      type: 'addProperties', extraData: { yet: 'another property' },
    },
    { type: 'clear' },
    {
      type: 'addProperties',
      extraData: {
        foo: 'bar', name: 'Jim',
      },
    },
    {
      type: 'removeProperties', keysToRemove: ['name', 'hello'],
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
