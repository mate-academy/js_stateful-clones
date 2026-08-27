'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const initialState = Object.assign({}, state);
  const result = [];
  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(initialState, action.extraData);
        result.push(Object.assign({}, initialState));
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete initialState[key];
        }
        result.push(Object.assign({}, initialState));
        break;
      case 'clear':
        for (const key in initialState) {
          delete initialState[key];
        }
        result.push(Object.assign({}, initialState));
        break;
    }
  }
  return result;
}

module.exports = transformStateWithClones;
