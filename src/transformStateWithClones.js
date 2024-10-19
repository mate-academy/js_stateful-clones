'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let currentState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;
    }

    res.push({ ...currentState });
  }

  return res;
}

module.exports = transformStateWithClones;
