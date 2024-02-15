'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versionHistory = [];
  let stateCopy = { ...state };
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR_PROPERTIES = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(stateCopy, action.extraData);
        break;

      case REMOVE_PROPERTIES: {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        };
        break;
      }

      case CLEAR_PROPERTIES: {
        stateCopy = {};
        break;
      }

      default: return 'please enter the correct action';
    }

    versionHistory.push({ ...stateCopy });
  }

  return versionHistory;
}

module.exports = transformStateWithClones;
