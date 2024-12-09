'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copyState = { ...state };
  const arrayStates = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      copyState = {};
    } else if (action.type === 'addProperties') {
      copyState = { ...copyState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      copyState = { ...copyState };

      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
    }
    arrayStates.push({ ...copyState });
  }

  return arrayStates;
}
module.exports = transformStateWithClones;
