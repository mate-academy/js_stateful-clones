'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const statePreviousVersion = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties' :
        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete stateClone[action.keysToRemove[i]];
        }
        break;

      case 'clear' :
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }
    statePreviousVersion.push({ ...stateClone });
  }

  return statePreviousVersion;
}

module.exports = transformStateWithClones;
