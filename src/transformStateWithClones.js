'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let updatedState = { ...state };
  const resultsArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        updatedState = Object.assign(updatedState, actions[i].extraData);
        break;

      case 'removeProperties':
        const keys = actions[i].keysToRemove;

        for (const key of keys) {
          delete updatedState[key];
        }
        break;

      case 'clear':
        for (const key in updatedState) {
          delete updatedState[key];
        }
        break;

      default:
        break;
    }
    resultsArray.push({ ...updatedState });
  }

  return resultsArray;
}

module.exports = transformStateWithClones;
