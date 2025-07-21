'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  const history = [];

  for (const action of actions) {
    const next = { ...current };

    if (action.type === 'addProperties') {
      Object.assign(next, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete next[key];
      }
    } else if (action.type === 'clear') {
      for (const key of Object.keys(next)) {
        delete next[key];
      }
    }
    history.push(next);
    current = next;
  }

  return history;
}

module.exports = transformStateWithClones;
