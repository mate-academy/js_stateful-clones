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

  const statesHistory = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case CLEAR_TYPE:
        newState = {};
        break;

      case ADD_PROPERTY_TYPE:
        Object.assign(newState, action.extraData);
        break;

      case REMOVE_PROPERTY_TYPE:
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
    }

    statesHistory.push({ ...newState });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
