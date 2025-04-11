'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // cria uma cópia inicial do estado
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // cópia antes de remover

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        break;
    }

    states.push({ ...currentState }); // adiciona o novo estado ao resultado
  }

  return states;
}

module.exports = transformStateWithClones;
