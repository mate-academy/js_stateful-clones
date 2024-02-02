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
        statesHistory.push({ ...newState });
        break;

      case ADD_PROPERTY_TYPE:
        Object.assign(newState, action.extraData);
        statesHistory.push({ ...newState });
        break;

      case REMOVE_PROPERTY_TYPE:
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        statesHistory.push({ ...newState });
        break;
    }
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
