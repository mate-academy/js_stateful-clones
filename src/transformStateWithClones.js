'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    const nextCurrentState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextCurrentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextCurrentState[key];
        }
        break;

      case 'clear':
        for (const key in nextCurrentState) {
          delete nextCurrentState[key];
        }
        break;

      default:
        // Нічого не робимо для невідомих типів дій
        break;
    }

    history.push(nextCurrentState);
    currentState = nextCurrentState;
  }

  return history;
}

module.exports = transformStateWithClones;
