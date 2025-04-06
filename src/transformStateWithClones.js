'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = { ...state };
  const stateCopy = [];

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        newState = {};
        break;

      case 'removeProperties':
        for (const text of act.keysToRemove) {
          delete newState[text];
        }
        break;

      case 'addProperties':
        Object.assign(newState, act.extraData);
        break;

      default:
        break;
    }
    stateCopy.push({ ...newState });
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
