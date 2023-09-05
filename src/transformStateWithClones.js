'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newCopy = { ...state };
  const newArray = [];

  const ADD_PROP = 'addProperties';
  const REMOVE_PROP = 'removeProperties';
  const CLEAR_PROP = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROP:
        Object.assign(newCopy, action.extraData);

        break;

      case REMOVE_PROP: {
        for (const key of action.keysToRemove) {
          delete newCopy[key];
        }

        break;
      }

      case CLEAR_PROP: {
        newCopy = {};

        break;
      }
    }
    newArray.push({ ...newCopy });
  }

  return newArray;
}

module.exports = transformStateWithClones;
