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

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(stateClone, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const value of actions[i].keysToRemove) {
        delete stateClone[value];
      }
    }

    if (actions[i].type === 'clear') {
      for (const removeKey in stateClone) {
        delete stateClone[removeKey];
      }
    }

    storyChange[i] = { ...stateClone };
  }

  return storyChange;
}

module.exports = transformStateWithClones;
