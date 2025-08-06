'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let current = { ...state };

  for (const action of actions) {
    let next;

    switch (action.type) {
      case 'clear':
        next = {};
        break;
      case 'addProperties':
        next = { ...current, ...action.extraData };
        break;
      case 'removeProperties':
        next = { ...current };

        for (const key of action.keysToRemove) {
          delete next[key];
        }
        break;
      default:
        next = { ...current };
    }
    history.push(next);
    current = next;
  }

  return history;
}

module.exports = transformStateWithClones;
