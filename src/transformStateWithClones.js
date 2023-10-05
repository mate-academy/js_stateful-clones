'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 */
function transformStateWithClones(state, actions) {
  const stateToModify = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateToModify, action.extraData);
        break;
      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete stateToModify[prop];
        }
        break;
      case 'clear':

        for (const prop in stateToModify) {
          delete stateToModify[prop];
        }
        break;
    }

    history.push({ ...stateToModify });
  }

  return history;
}

module.exports = transformStateWithClones;
