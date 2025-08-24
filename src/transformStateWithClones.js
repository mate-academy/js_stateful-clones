'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {{}}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';
  const newObj = { ...state };

  for (const action of actions) {
    if (action.type === ADD_PROPERTIES) {
      Object.assign(newObj, action.extraData);
    }

    if (action.type === REMOVE_PROPERTIES) {
      for (const i of action.keysToRemove) {
        delete newObj[i];
      }
    }

    if (action.type === CLEAR) {
      Object.keys(newObj).forEach((key) => delete newObj[key]);
    }
  }

  return [newObj];
}

module.exports = transformStateWithClones;
