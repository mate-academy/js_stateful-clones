'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  const clonedStates = [];

  for (const elem of actions) {
    switch (elem.type) {
      case 'addProperties':
        Object.assign(copyState, elem.extraData);
        break;

      case 'removeProperties':
        for (let i = 0; i < elem.keysToRemove.length; i++) {
          delete copyState[elem.keysToRemove[i]];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        break;
    }

    clonedStates.push({ ...copyState });
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
