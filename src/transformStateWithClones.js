'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const previousStateVers = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(copyState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;
      }

      case 'clear': {
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      }

      default: {
        throw new Error(`Unknown action ${action.type}`);
      }
    }

    previousStateVers.push({ ...copyState });
  }

  return previousStateVers;
}

module.exports = transformStateWithClones;
