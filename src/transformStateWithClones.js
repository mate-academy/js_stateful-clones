'use strict';

/**
 * @param {Object} state Estado inicial
 * @param {Object[]} actions Lista de ações
 * @return {Object[]} Lista de estados clonados após cada ação
 */
const transformStateWithClones = (state, actions) => {
  const stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        addProperties(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        removeProperties(stateCopy, action.keysToRemove);
        break;
      }

      case 'clear': {
        clearState(stateCopy);
        break;
      }

      // 👇 Aqui é o ponto alterado
      default: {
        // Tratamento explícito de erro para ações desconhecidas
        throw new Error(`Ação desconhecida: ${action.type}`);
      }
    }

    states.push(structuredClone(stateCopy));
  }

  return states;
};

/**
 * Adiciona propriedades ao objeto de estado
 * @param {Object} state Estado atual
 * @param {Object} data Dados a serem adicionados
 */
function addProperties(state, data) {
  Object.assign(state, data);
}

/**
 * Remove propriedades do objeto de estado
 * @param {Object} state Objeto de estado
 * @param {string[]} keys Chaves a serem removidas
 */
function removeProperties(state, keys) {
  for (const key of keys) {
    delete state[key];
  }
}

/**
 * Limpa todas as propriedades do objeto de estado
 * @param {Object} state Objeto de estado
 */
function clearState(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
