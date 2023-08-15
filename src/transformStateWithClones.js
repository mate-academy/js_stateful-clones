'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR_PROPERTIES = 'clear';
  let temp = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === ADD_PROPERTIES) {
      Object.assign(temp, action.extraData);
    }

    if (action.type === REMOVE_PROPERTIES) {
      for (const remove of action.keysToRemove) {
        if (temp.hasOwnProperty(remove)) {
          delete temp[remove];
        }
      }
    }

    if (action.type === CLEAR_PROPERTIES) {
      temp = {};
    }

    result.push({ ...temp });
  }

  return result;
}

module.exports = transformStateWithClones;
