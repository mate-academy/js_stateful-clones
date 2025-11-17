'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_ACTION = 'addProperties';
  const REMOVE_ACTION = 'removeProperties';
  const CLEAR_ACTION = 'clear';

  const stateClones = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_ACTION: {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case REMOVE_ACTION: {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      case CLEAR_ACTION: {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }

    stateClones.push({ ...stateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
