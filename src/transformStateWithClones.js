'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  return actions.map(({ type, extraData = {}, keysToRemove = [] }) => {
      if (type === 'clear') currentState = {};
      if (type === 'addProperties') currentState = { ...currentState, ...extraData };
      if (type === 'removeProperties') keysToRemove.forEach(key => delete currentState[key]);
      return { ...currentState };
  });
}

const initialState = { foo: 'bar', bar: 'foo' };
const actions = [
  { type: 'addProperties', extraData: { name: 'Jim', hello: 'world' } },
  { type: 'removeProperties', keysToRemove: ['bar', 'hello'] },
  { type: 'addProperties', extraData: { another: 'one' } }
];

console.log(transformStateWithClones(initialState, actions));
