'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    const stateClone = { ...currentState };

    if (action.type === 'clear') {
      for (const key of Object.keys(stateClone)) {
        delete stateClone[key];
      }
    } else if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
    }
    currentState = stateClone;
    result.push(currentState);
  }

  return result;
}
module.exports = transformStateWithClones;
