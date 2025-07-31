'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    
    // Clone current state before applying changes
    currentState = { ...currentState };

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
    }

    // Push a snapshot (clone) into history
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
