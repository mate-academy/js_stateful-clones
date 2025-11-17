'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const HISTORY = [];
  let stateCopy = { ...state };
  let next = { ...stateCopy };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        next = {};
        break;
      case 'addProperties':
        next = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        next = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete next[key];
        }
        break;
      default:
        break;
    }
    HISTORY.push(next);
    stateCopy = next;
  }

  return HISTORY;
}

module.exports = transformStateWithClones;
