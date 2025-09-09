'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };
  const ADD_TYPE = 'addProperties';
  const REMOVE_TYPE = 'removeProperties';
  const CLEAR_TYPE = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_TYPE:
        Object.assign(stateCopy, action.extraData);
        break;

      case REMOVE_TYPE:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR_TYPE:
        stateCopy = {};
        break;

      default:
        throw new Error('Wrong type of action');
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
