'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let previousState = { ...state };

  for (const action of actions) {
    let currentState = { ...previousState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error('Tipo de ação inválido: ' + action.type);
    }
    result.push(currentState);
    previousState = currentState;
  }

  return result;
}

module.exports = transformStateWithClones;
