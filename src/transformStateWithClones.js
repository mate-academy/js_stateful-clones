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
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const whitchKey of action.keysToRemove) {
        delete newState[whitchKey];
      }
    }

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }
    result.push(newState);
    newState = Object.assign({}, newState);
  }

  return result;
}

module.exports = transformStateWithClones;
