'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copiedStateObject = { ...state };
  const newState = [];

  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case ADD_PROPERTIES:
        Object.assign(copiedStateObject, extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete copiedStateObject[key];
        }
        break;

      case CLEAR:
        for (const key in copiedStateObject) {
          delete copiedStateObject[key];
        }
        break;
    }

    newState.push({ ...copiedStateObject });
  }

  return newState;
}

module.exports = transformStateWithClones;
