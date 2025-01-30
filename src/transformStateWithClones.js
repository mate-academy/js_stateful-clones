'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  return actions.map(({ type, extraData, keysToRemove }) => {
      if (type === 'clear') currentState = {};
      if (type === 'addProperties') currentState = { ...currentState, ...extraData };
      if (type === 'removeProperties') keysToRemove.forEach(key => delete currentState[key]);
      return { ...currentState };
  });
}

// Пример использования:
const initialState = { a: 1, b: 2, c: 3 };
const actions = [
  { type: 'addProperties', extraData: { d: 4, e: 5 } },
  { type: 'removeProperties', keysToRemove: ['a', 'c'] },
  { type: 'clear' },
  { type: 'addProperties', extraData: { x: 10 } }
];

console.log(transformStateWithClones(initialState, actions));
