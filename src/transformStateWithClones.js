'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyOfState = { ...state };
  const allPrevStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete copyOfState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        break;
      }

      default:
        throw new Error('Invalid property');
    }

    allPrevStates.push({ ...copyOfState });
  }

  return allPrevStates;
}

module.exports = transformStateWithClones;
