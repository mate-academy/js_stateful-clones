'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let allStates = [];
  const stateCopy = { ...state };
  const ADD_PROPERTIES_TYPE = 'addProperties';
  const REMOVE_PROPERTIES_TYPE = 'removeProperties';
  const CLEAR_PROPERTIES_TYPE = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES_TYPE:
        Object.assign(stateCopy, action.extraData);
        break;
      case REMOVE_PROPERTIES_TYPE:
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      case CLEAR_PROPERTIES_TYPE:
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;
      default:
        break;
    }
    allStates = [...allStates, { ...stateCopy }];
  }

  return allStates;
}

module.exports = transformStateWithClones;
