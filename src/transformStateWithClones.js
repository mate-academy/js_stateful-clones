'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @property {string} type
 * @property {Object} extraData
 * @property {string[]} keysToRemove
 * @return {Object[]}
 */

const ADD_PROPERTIES = 'addProperties';
const REMOVE_PROPERTIES = 'removeProperties';
const CLEAR = 'clear';

function transformStateWithClones(state, actions) {
  const stateClones = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;
    const newState = { ...currentState };

    if (type === ADD_PROPERTIES) {
      const { extraData } = action;

      Object.assign(newState, extraData);
    } else if (type === REMOVE_PROPERTIES) {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        if (newState.hasOwnProperty(key)) {
          delete newState[key];
        }
      }
    } else if (type === CLEAR) {
      for (const key in newState) {
        if (newState.hasOwnProperty(key)) {
          delete newState[key];
        }
      }
    }
    stateClones.push(newState);
    currentState = newState;
  }

  return stateClones;
}
module.exports = transformStateWithClones;
