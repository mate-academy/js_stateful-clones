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
    let newState;

    switch (type) {
      case ADD_PROPERTIES:
        newState = { ...currentState };

        const { extraData } = action;

        Object.assign(newState, extraData);
        break;
      case REMOVE_PROPERTIES:
        newState = { ...currentState };

        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;
      case CLEAR:
        newState = {};
        break;
      default:
        newState = currentState;
        break;
    }

    stateClones.push(newState);
    currentState = newState;
  }

  return stateClones;
}
module.exports = transformStateWithClones;
