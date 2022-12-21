'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateModifications = [];
  const copyState = { ...state };

  for (const object of actions) {
    for (const key in object) {
      switch (object[key]) {
        case 'removeProperties':
          for (const value of object.keysToRemove) {
            delete copyState[value];
          }
          break;

        case 'clear':
          for (const i in copyState) {
            delete copyState[i];
          }
          break;

        default:
          Object.assign(copyState, object.extraData);
      }
    }

    stateModifications.push({ ...copyState });
  }

  return stateModifications;
}

module.exports = transformStateWithClones;
