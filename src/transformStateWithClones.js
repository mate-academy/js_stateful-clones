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
        resultsArray.push({ ...updatedState });
        break;
      case 'removeProperties':
        const keys = actions[i].keysToRemove;

        for (const key of keys) {
          delete updatedState[key];
        }
        resultsArray.push({ ...updatedState });
        break;

      default:
        for (const key in updatedState) {
          delete updatedState[key];
        }
        resultsArray.push({ ...updatedState });
    }
  }

  return resultsArray;
}

module.exports = transformStateWithClones;
