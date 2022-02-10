'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const saveState = [];
  const currentState = { ...state };

  for (const value of actions) {
    switch (value['type']) {
      case 'addProperties':
        Object.assign(currentState, value['extraData']);
        break;

      case 'removeProperties':
        for (const item of value['keysToRemove']) {
          delete currentState[item];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
    }
    saveState.push({ ...currentState });
  }

  return saveState;
}

module.exports = transformStateWithClones;
