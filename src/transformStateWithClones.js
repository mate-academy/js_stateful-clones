'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateCopy = { ...state };
  const PROPERTY_ADD = 'addProperties';
  const PROPERTY_REMOVE = 'removeProperties';
  const PROPERTY_CLEAR = 'clear';
  const arrayOfActions = [];

  for (const action of actions) {
    switch (action.type) {
      case PROPERTY_ADD:
        Object.assign(stateCopy, action.extraData);
        break;

      case PROPERTY_REMOVE: {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;
      }

      case PROPERTY_CLEAR: {
        stateCopy = {};

        break;
      }

      default:
        break;
    }

    arrayOfActions.push({ ...stateCopy });
  }

  return arrayOfActions;
}

module.exports = transformStateWithClones;
