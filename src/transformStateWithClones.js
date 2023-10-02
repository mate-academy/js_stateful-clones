'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';
  const newState = { ...state };
  const arrState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_PROPERTIES:
        Object.assign(newState, extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case CLEAR:
        for (const keys in newState) {
          delete newState[keys];
        }
        break;
    }
    arrState.push({ ...newState });
  }

  return arrState;
}

module.exports = transformStateWithClones;
