'use strict';

const REMOVE_PROPERTIES = 'removeProperties';
const ACTION_ADD_PROPERTIES = 'addProperties';
const CLEAR = 'clear';

/**
* @param {Object} state
* @typedef {Object} Action
* @property {string} type
* @property {Object} extraData
* @property {strinmg[]} keysToRemove
* @param {Action[]} actions
*/

function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ACTION_ADD_PROPERTIES:
        const { extraData } = action;

        Object.assign(currentState, extraData);
        break;

      case REMOVE_PROPERTIES:
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        }
        break;

      case CLEAR:
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
