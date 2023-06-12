'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTY_TYPE = 'addProperties';
  const REMOVE_PROPERTY_TYPE = 'removeProperties';
  const CLEAR_TYPE = 'clear';

  const stateCopy = { ...state };
  const stateArray = [];

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTY_TYPE:
        for (const key of Object.keys(action.extraData)) {
          stateCopy[key] = action.extraData[key];
        }

        break;

      case REMOVE_PROPERTY_TYPE:
        for (let j = 0; j < action.keysToRemove.length; j++) {
          const key = action.keysToRemove[j];

          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }

        break;

      case CLEAR_TYPE:
        for (const key in stateCopy) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }

        break;

      default:
        throw new Error('Unknown action type');
    }

    stateArray.push({ ...stateCopy });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
