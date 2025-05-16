'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...state }; // Cria uma cópia do estado inicial

  for (const action of actions) {
    // Cria uma cópia do estado atual para modificação
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
    }

    // Adiciona o novo estado ao resultado
    result.push(newState);
    // Atualiza o estado atual para a próxima iteração
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
