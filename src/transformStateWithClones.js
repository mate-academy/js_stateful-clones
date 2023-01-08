'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const prop in action.extraData) {
          newState[prop] = action.extraData[prop];
        }

        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete newState[prop];
        }

        break;

      case 'clear':
        for (const prop in newState) {
          delete newState[prop];
        }

        break;
    }

    states.push({ ...newState });
  }

  return states;
}

module.exports = transformStateWithClones;
