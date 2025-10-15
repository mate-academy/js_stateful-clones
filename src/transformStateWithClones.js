'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // começamos com uma cópia do estado original

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        // adiciona novas propriedades ao estado atual
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // cria uma cópia e remove as chaves indicadas
        const newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        currentState = newState;
        break;

      case 'clear':
        // zera o estado (novo objeto vazio)
        currentState = {};
        break;

      default:
        // se vier um tipo desconhecido, apenas ignora
        break;
    }

    // adiciona uma cópia do novo estado ao histórico
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
