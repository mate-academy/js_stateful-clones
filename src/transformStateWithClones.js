'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateNewObject = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateNewObject, action.extraData);
      stateHistory.push(Object.assign({}, stateNewObject));
    }

    if (action.type === 'removeProperties') {
      for (const item of action.keysToRemove) {
        delete stateNewObject[item];
      }
      stateHistory.push(Object.assign({}, stateNewObject));
    }

    if (action.type === 'clear') {
      for (const key of Object.keys(stateNewObject)) {
        delete stateNewObject[key];
      }
      stateHistory.push(Object.assign({}, stateNewObject));
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
