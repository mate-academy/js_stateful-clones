'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = state;
  const history = [];

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        break;
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
