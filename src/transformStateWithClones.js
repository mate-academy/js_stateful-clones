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
    switch (action.type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          if (property in newState) {
            delete newState[property];
          }
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    output.push({ ...newState });
  }

  return output;
}

module.exports = transformStateWithClones;
