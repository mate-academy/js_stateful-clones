'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateClone = { ...state };
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR_PROPERTIES = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES: {
        Object.assign(stateClone, action.extraData);

        break;
      }

      case REMOVE_PROPERTIES: {
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }

        break;
      }

      case CLEAR_PROPERTIES: {
        for (const key of Object.keys(stateClone)) {
          delete stateClone[key];
        }

        break;
      }
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
