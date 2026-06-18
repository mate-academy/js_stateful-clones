'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const story = [];
  let currentstate = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentstate = {};
    }

    if (action.type === 'addProperties') {
      currentstate = {
        ...currentstate,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      const copy = { ...currentstate };

      for (const needtodelete of action.keysToRemove) {
        delete copy[needtodelete];
      }
      currentstate = copy;
    }
    story.push({ ...currentstate });
  }

  return story;
}

module.exports = transformStateWithClones;
