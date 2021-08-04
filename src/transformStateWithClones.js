'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const storyChange = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const value of action.keysToRemove) {
        delete stateClone[value];
      }
    }

    if (action.type === 'clear') {
      for (const removeKey in stateClone) {
        delete stateClone[removeKey];
      }
    }

    storyChange.push({ ...stateClone });
  }

  return storyChange;
}

module.exports = transformStateWithClones;
