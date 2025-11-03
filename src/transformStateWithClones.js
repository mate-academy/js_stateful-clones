'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const res = [];

  for (const ch of actions) {
    switch (ch.type) {
      case 'addProperties':
        Object.assign(currentState, ch.extraData);
        break;

      case 'removeProperties':
        for (const key of ch.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    res.push({ ...currentState });
  }

  return res;
}

module.exports = transformStateWithClones;
