'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const results = [];

  for (const action of actions) {
    let stateClone;

    switch (action.type) {
      case 'clear':
        currentState = {};
        stateClone = { ...currentState };
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        stateClone = { ...currentState };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        stateClone = { ...currentState };
        break;
      default:
        throw new Error(`Неизвестный тип действия: ${action.type}`);
    }
    results.push(stateClone);
  }

  return results;
}

module.exports = transformStateWithClones;
