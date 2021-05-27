'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clonedState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      clonedState = Object.assign(clonedState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete clonedState[keyToRemove];
      }
    }

    if (action.type === 'clear') {
      for (const key in clonedState) {
        delete clonedState[key];
      }
    }

    result.push(clonedState);
    clonedState = { ...clonedState };
  }

  return result;
}

module.exports = transformStateWithClones;
