const transformStateWithClones = require('./transformStateWithClones');

describe('transformStateWithClones', () => {
  test('should apply "clear" action and produce an empty state', () => {
    const initialState = { a: 1, b: 2 };
    const actions = [{ type: 'clear' }];
    const result = transformStateWithClones(initialState, actions);

    expect(result).toEqual([{}]);
  });

  test('should apply "addProperties" action and merge properties', () => {
    const initialState = { a: 1 };
    const actions = [{ type: 'addProperties', extraData: { b: 2, c: 3 } }];
    const result = transformStateWithClones(initialState, actions);

    expect(result).toEqual([{ a: 1, b: 2, c: 3 }]);
  });

  test('should apply "removeProperties" and remove existing keys', () => {
    const initialState = { a: 1, b: 2, c: 3 };
    const actions = [{ type: 'removeProperties', keysToRemove: ['b', 'c'] }];
    const result = transformStateWithClones(initialState, actions);

    expect(result).toEqual([{ a: 1 }]);
  });

  test('should ignore non-existing keys in "removeProperties"', () => {
    const initialState = { a: 1 };
    const actions = [{ type: 'removeProperties', keysToRemove: ['b'] }];
    const result = transformStateWithClones(initialState, actions);

    expect(result).toEqual([{ a: 1 }]);
  });

  test('should handle multiple sequential actions correctly', () => {
    const initialState = { a: 1 };
    const actions = [
      { type: 'addProperties', extraData: { b: 2 } },
      { type: 'removeProperties', keysToRemove: ['a'] },
      { type: 'addProperties', extraData: { c: 3 } },
      { type: 'clear' },
      { type: 'addProperties', extraData: { d: 4 } },
    ];
    const result = transformStateWithClones(initialState, actions);

    expect(result).toEqual([
      { a: 1, b: 2 },
      { b: 2 },
      { b: 2, c: 3 },
      {},
      { d: 4 },
    ]);
  });
});
