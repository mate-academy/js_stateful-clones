'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 */
function transformStateWithClones(state, actions) {
  const stateToModify = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateToModify, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const prop of action.keysToRemove) {
        delete stateToModify[prop];
      }
    }

    if (action.type === 'clear') {
      for (const prop in stateToModify) {
        delete stateToModify[prop];
      }
    }

    history.push({ ...stateToModify });
  }

  return history;
}

module.exports = transformStateWithClones;
