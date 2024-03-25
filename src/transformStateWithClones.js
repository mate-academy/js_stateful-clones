'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultingArray = [];
  const clone = Object.assign({}, state);
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR_ALL_PROPERTIES = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES: {
        Object.assign(clone, action.extraData);
        break;
      }

      case REMOVE_PROPERTIES: {
        for (const key of Object.entries(action.keysToRemove)) {
          delete clone[key[1]];
        }

        break;
      }

      case CLEAR_ALL_PROPERTIES: {
        for (const key in clone) {
          delete clone[key];
        }

        break;
      }
    }
    resultingArray.push(Object.assign({}, clone));
  }

  return resultingArray;
}

module.exports = transformStateWithClones;
