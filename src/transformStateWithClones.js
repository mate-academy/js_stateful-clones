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

  for (const types of actions) {
    if (types.type === ADD_PROPERTIES) {
      Object.assign(newState, types.extraData);
    }

    if (types.type === REMOVE_PROPERTIES) {
      for (const key of types.keysToRemove) {
        delete newState[key];
      }
    }

    if (types.type === CLEAR) {
      for (const keys in newState) {
        delete newState[keys];
      }
    }

    arrState.push({ ...newState });
  }

  return arrState;
}

module.exports = transformStateWithClones;
