'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateStep = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties': {
        const properties = object.extraData;

        for (const key in properties) {
          stateStep[key] = properties[key];
        }
        break;
      }

      case 'removeProperties': {
        const keys = object.keysToRemove;

        for (const key of keys) {
          delete stateStep[key];
        }
        break;
      }

      case 'clear': {
        for (const key in stateStep) {
          delete stateStep[key];
        }
        break;
      }

      default: {
        break;
      }
    }
    stateHistory.push({ ...stateStep });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
