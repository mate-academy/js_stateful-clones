'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties': {
        const newState = { ...stateCopy };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }

        stateCopy = newState;
        break;
      }

      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
