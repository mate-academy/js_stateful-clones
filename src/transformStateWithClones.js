'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  const storyState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(storyState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        if (property in storyState) {
          delete storyState[property];
        }
      }
    }

    if (action.type === 'clear') {
      for (const key in storyState) {
        delete storyState[key];
      }
    }

    clone.push({ ...storyState });
  }

  return clone;
}

module.exports = transformStateWithClones;
