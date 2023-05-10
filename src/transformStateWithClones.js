'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const previousStateVers = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        copyState = Object.assign(copyState, action.extraData);
        previousStateVers.push({ ...copyState });
        break;
      }

      case 'removeProperties': {
        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        }
        previousStateVers.push({ ...copyState });
        break;
      }

      case `clear`: {
        for (const key in copyState) {
          delete copyState[key];
        }
        previousStateVers.push({ ...copyState });
        break;
      }

      default: {
        throw new Error('Unknown action');
      }
    }
  }

  return previousStateVers;
}

module.exports = transformStateWithClones;
