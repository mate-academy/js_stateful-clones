'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        for (const [key, value] of Object.entries(action.extraData)) {
          newState[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
