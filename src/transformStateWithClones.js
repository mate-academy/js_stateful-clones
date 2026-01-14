'use strict';

/**
 * Aplica uma sequência de ações a um estado inicial, retornando
 * o histórico de estados gerados após cada transformação.
 *
 * @param {Object} initialState - Estado inicial (não é modificado)
 * @param {Object[]} actions - Array de ações a serem aplicadas
 * @param {string} actions[].type - Tipo: 'clear' | 'addProperties' |
 *   'removeProperties'
 * @param {Object} [actions[].extraData] - Propriedades a adicionar
 *   (addProperties)
 * @param {string[]} [actions[].keysToRemove] - Chaves a remover
 *   (removeProperties)
 *
 * @return {Object[]} Array com snapshot do estado após cada ação
 */

function transformStateWithClones(initialState, actions) {
  const stateHistory = [];

  // Clone do estado inicial para garantir imutabilidade
  let currentState = { ...initialState };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        // Reseta o estado para objeto vazio
        currentState = {};
        break;

      case 'addProperties':
        // Mescla propriedades de extraData ao estado atual
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Cria novo objeto excluindo as chaves especificadas
        currentState = Object.keys(currentState).reduce((newState, key) => {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }

          return newState;
        }, {});
        break;

      default:
        throw new Error(
          `Unknown action type: "${action.type}". ` +
            'Expected: "clear" | "addProperties" | "removeProperties"',
        );
    }

    // Armazena clone do estado atual no histórico
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
