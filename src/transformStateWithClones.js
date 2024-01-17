'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const collectionStates = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties' :
        for (const key in obj.extraData) {
          newState[key] = obj.extraData[key];
        }
        collectionStates.push({ ...newState });

        break;

      case 'removeProperties' :
        for (const key in obj.keysToRemove) {
          delete newState[obj.keysToRemove[key]];
        }
        collectionStates.push({ ...newState });

        break;

      case 'clear' :
        for (const key in newState) {
          delete newState[key];
        }
        collectionStates.push({ ...newState });

        break;

      default: break;
    }
  }

  return collectionStates;
}

module.exports = transformStateWithClones;
