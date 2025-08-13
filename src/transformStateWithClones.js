'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // 1. Clonar o estado inicial para não modificá-lo
  let currentState = structuredClone(state);
  const history = [];

  // 2. Iterar sobre as ações
  for (const action of actions) {
    // 3. Usar switch para tratar os tipos de ação
    switch (action.type) {
      case 'clear':
        currentState = {}; // Cria um novo objeto vazio
        break;
      case 'addProperties':
        // Cria um novo objeto combinando o estado atual e os dados extras
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        // Clonar para não modificar o estado do passo anterior
        const newState = { ...currentState };

        for (const key of action.keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
        currentState = newState;
        break;
      default:
    }
    // 4. Clonar o estado atual antes de adicionar ao histórico
    history.push(structuredClone(currentState));
  }

  // 5. Retornar o histórico de estados
  return history;
}

module.exports = transformStateWithClones;
