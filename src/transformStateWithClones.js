'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const actionCopies = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const { extraData } = action;

        Object.assign(stateCopy, extraData);
        // actionCopies.push(stateCopy);
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        // actionCopies.push(stateCopy);
        break;
      }

      case 'clear': {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        // actionCopies.push(stateCopy);
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
    actionCopies.push({ ...stateCopy });
  }

  return actionCopies;
}

module.exports = transformStateWithClones;
