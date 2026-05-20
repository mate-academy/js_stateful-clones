'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const massive = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties': {
        const filteredState = {};

        for (const key in stateCopy) {
          if (!action.keysToRemove.includes(key)) {
            filteredState[key] = stateCopy[key];
          }
        }

        stateCopy = filteredState;
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    massive.push(stateCopy);
  }

  return massive;
}

module.exports = transformStateWithClones;
