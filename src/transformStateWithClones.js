'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const statesHistory = [];

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        for (const value in i.extraData) {
          currentState[value] = i.extraData[value];
        }

        break;
      case 'removeProperties':
        for (const key of i.keysToRemove) {
          delete currentState[key];
        }
        break;
      case 'clear':
        currentState = {};
        break;
    }
    statesHistory.push({ ...currentState });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
