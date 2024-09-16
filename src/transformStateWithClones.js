'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const outputStatesArray = [];
  let cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(cloneState, action.extraData);
        break;
      }

      case 'removeProperties': {
        action.keysToRemove.forEach(key => delete cloneState[key]);
        break;
      }

      case 'clear': {
        cloneState = {};
        break;
      }

      default: break;
    }
    outputStatesArray.push({ ...cloneState });
  }

  return outputStatesArray;
}

module.exports = transformStateWithClones;
