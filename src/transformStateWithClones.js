'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 *
 */
function transformStateWithClones(state, actions) {
  /**  write code here
  const stateHistory = [];
  const copyState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const element of action.keysToRemove) {
        delete copyState[element];
      }
    } else if (action.type === 'clear') {
      for (const key of Object.keys(copyState)) {
        delete copyState[key];
      }
    }
  */

  const stateHistory = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const element of action.keysToRemove) {
        delete stateCopy[element];
      }
    } else if (action.type === 'clear') {
      for (const key of Object.keys(stateCopy)) {
        delete stateCopy[key];
      }
    }

    stateHistory.push(Object.assign({}, stateCopy));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
