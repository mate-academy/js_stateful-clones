'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changesOfState = [];
  const clone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
      changesOfState.push({ ...clone });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }
      changesOfState.push({ ...clone });
    }

    if (action.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
      changesOfState.push({ ...clone });
    }
  }

  return changesOfState;
}

module.exports = transformStateWithClones;
