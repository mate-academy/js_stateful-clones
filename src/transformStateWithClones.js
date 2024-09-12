'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR_PROPERTIES = 'clear';

  const outputState = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES: {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case REMOVE_PROPERTIES: {
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      }

      case CLEAR_PROPERTIES: {
        stateCopy = {};
        break;
      }

      default:
        throw new Error(`Error in ${action.type} action type`);
    }
    outputState.push({ ...stateCopy });
  }

  return outputState;
}

module.exports = transformStateWithClones;
