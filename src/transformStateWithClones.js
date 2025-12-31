'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = [];
  let current = { ...state };

  for (const action of actions) {
    const next = { ...current };

    switch (action.type) {
      case 'addProperties':
        Object.assign(next, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete next[key];
        }
        break;
      case 'clear':
        for (const key of Object.keys(next)) {
          delete next[key];
        }
        break;
      default:
        break;
    }

    stateCopy.push(next);
    current = next;
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
