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
        Object.assign(newState, obj.extraData);

        break;

      case 'removeProperties' :
        for (const key in obj.keysToRemove) {
          delete newState[obj.keysToRemove[key]];
        }

        break;

      case 'clear' :
        for (const key in newState) {
          delete newState[key];
        }

        break;

      default:
        const error = new Error('unexpected action');

        throw error;
    }

    collectionStates.push({ ...newState });
  }

  return collectionStates;
}

module.exports = transformStateWithClones;
