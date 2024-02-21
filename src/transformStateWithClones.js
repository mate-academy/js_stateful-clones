'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const copyStateAdd = { ...state };
  const copyStateRe = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateHistory.push(Object.assign(copyStateAdd, action.extraData));
        break;

      case 'removeProperties':
        stateHistory.push(removeProperties(copyStateRe, action.keysToRemove));
        break;

      case 'clear':
        stateHistory.push({});
        break;
    }
  }

  return stateHistory;
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
