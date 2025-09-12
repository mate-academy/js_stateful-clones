'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let history = [];
  let current = { ...state };

  for (const action of actions) {
    const type = action.type;

    if (type === 'addProperties') {
      Object.assign(current, action.extraData);
    }

    if (type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete current[key];
      }
    }

    if (type === 'clear') {
      current = {}
    }

    history.push({ ...current})
  }

  return history
}

module.exports = transformStateWithClones;
