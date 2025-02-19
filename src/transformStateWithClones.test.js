'use strict';

const transformStateWithClones = require('../src/transformStateWithClones');


describe('transformStateWithClones', () => {
  test('should correctly handle clear action', () => {
    const state = { a: 1, b: 2 };
    const actions = [{ type: 'clear' }];
    const result = transformStateWithClones(state, actions);

    expect(result.length).toBe(2); // Має бути два стани: початковий і після очищення
    expect(result[1]).toEqual({}); // Після clear стан має бути порожнім об'єктом
  });

  test('should correctly handle addProperties action', () => {
    const state = { a: 1 };
    const actions = [{ type: 'addProperties', extraData: { b: 2 } }];
    const result = transformStateWithClones(state, actions);

    expect(result.length).toBe(2); // Має бути два стани
    expect(result[1]).toEqual({ a: 1, b: 2 }); // Створюється нова властивість b
  });

  test('should correctly handle removeProperties action', () => {
    const state = { a: 1, b: 2, c: 3 };
    const actions = [{ type: 'removeProperties', keysToRemove: ['b'] }];
    const result = transformStateWithClones(state, actions);

    expect(result.length).toBe(2); // Має бути два стани
    expect(result[1]).toEqual({ a: 1, c: 3 }); // Властивість b повинна бути видалена
  });

  test('should handle multiple actions correctly', () => {
    const state = { a: 1 };
    const actions = [
      { type: 'addProperties', extraData: { b: 2 } },
      { type: 'removeProperties', keysToRemove: ['a'] },
    ];
    const result = transformStateWithClones(state, actions);

    expect(result.length).toBe(3); // Має бути три стани
    expect(result[2]).toEqual({ b: 2 }); // Властивість a повинна бути видалена
  });

  test('should throw error for unknown action type', () => {
    const state = { a: 1 };
    const actions = [{ type: 'unknownAction' }];

    expect(() => transformStateWithClones(state, actions)).toThrow('Unknown action type: unknownAction');
  });
});

