'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statehistory = [];
  const stateForEachAction = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateForEachAction, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateForEachAction[key];
        }
        break;

      case 'clear':
        for (const key in stateForEachAction) {
          delete stateForEachAction[key];
        }
        break;
    }

    statehistory.push({ ...stateForEachAction });
  }

  return statehistory;
}

module.exports = transformStateWithClones;

module.exports = transformStateWithClones;
