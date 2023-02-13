'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPS = 'addProperties';
  const REMOVE_PROPS = 'removeProperties';
  const CLEAR = 'clear';

  const outputState = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPS: {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case REMOVE_PROPS: {
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      }

      case CLEAR: {
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
