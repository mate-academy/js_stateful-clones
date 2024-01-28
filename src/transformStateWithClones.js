'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const output = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = {
        ...newState,
        ...action.extraData,
      };
      output.push({ ...newState });
    } else if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        if (property in newState) {
          delete newState[property];
        }
      }
      output.push({ ...newState });
    } else if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      output.push({ ...newState });
    }
  }

  return output;
}

module.exports = transformStateWithClones;
