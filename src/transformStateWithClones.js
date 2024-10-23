'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  let clone = { ...state };
  const story = [];

  for (const action of actions) {
    clone = { ...clone };

    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }
    }

    if (action.type === 'clear') {
      clone = {};
    }
    story.push(clone);
  }

  return story;
}

module.exports = transformStateWithClones;
