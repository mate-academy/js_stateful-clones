'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = Object.assign({}, newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (newState.hasOwnProperty(key)) {
          delete newState[key];
        }
      }
    }

    if (action.type === 'clear') {
      newState = {};
    }
    result.push(Object.assign({}, newState));
  }

  return result;
}
module.exports = transformStateWithClones;
