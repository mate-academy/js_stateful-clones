'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versionOfState = [];
  let newState = { ...state };

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(newState, i.extraData);
        versionOfState.push({ ...newState });
        break;

      case 'removeProperties':
        for (const j of i.keysToRemove) {
          if (j in newState) {
            delete newState[j];
          }
        }
        versionOfState.push({ ...newState });
        break;

      case 'clear' :
        newState = {};
        versionOfState.push({ ...newState });
    }
  }

  return versionOfState;
}

module.exports = transformStateWithClones;
