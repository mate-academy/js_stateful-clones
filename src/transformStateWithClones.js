'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = {...state};
  for (const action of actions) {
    let newState = {...currentState};
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      result.push(newState);
      currentState = newState;
    }

    if (action.type === 'removeProperties') {
      for (const k of action.keysToRemove) {
        delete newState[k];
      }
    }

    if (action.type === 'clear') {
      for (const k in state) {
        newState = {};
      }
    }
  }
  return result;
}


module.exports = transformStateWithClones;
