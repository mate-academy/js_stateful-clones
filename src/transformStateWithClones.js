'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  // estado atual começa como uma cópia do inicial
  let currentState = { ...state };

  for (const action of actions) {
    // Garantir que sempre trabalhamos com um NOVO objeto
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          nextState = { ...nextState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          action.keysToRemove.forEach((key) => {
            delete nextState[key];
          });
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        // Ação desconhecida → ignora
        break;
    }

    // Salvar o resultado desta etapa
    stateHistory.push(nextState);

    // Atualizar estado atual para próxima iteração
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
