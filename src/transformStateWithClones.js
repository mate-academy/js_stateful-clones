'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const TYPE_ADD = 'addProperties';
  const TYPE_REMOVE = 'removeProperties';
  const TYPE_CLEAR = 'clear';
  const CLONES_HISTORY = [];
  let CLONES = { ...state };

  for (const action of actions) {
    if (action.type === TYPE_ADD) {
      CLONES = { ...CLONES, ...action.extraData };
    }

    if (action.type === TYPE_REMOVE) {
      const newStateAfterRemoval = { ...CLONES };

      for (const key of action.keysToRemove) {
        delete newStateAfterRemoval[key];
      }
      CLONES = newStateAfterRemoval;
    }

    if (action.type === TYPE_CLEAR) {
      CLONES = {};
    }
    CLONES_HISTORY.push({ ...CLONES });
  }

  return CLONES_HISTORY;
}

module.exports = transformStateWithClones;
