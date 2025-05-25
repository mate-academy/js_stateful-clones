'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];

  let currentState = { ...state }; // clone inicial do estado

  for (const action of actions) {
    // Sempre criamos uma cópia para evitar mutações diretas
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {}; // Estado limpo
        break;

      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          newState = {
            ...newState,
            ...action.extraData,
          }; // Adiciona propriedades
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete newState[key]; // Remove as chaves se existirem
          }
        }
        break;

      default:
        // Ignora ações desconhecidas
        break;
    }

    results.push(newState); // Salva o estado resultante
    currentState = newState; // Atualiza o estado atual para a próxima iteração
  }

  return results;
}

module.exports = transformStateWithClones;
