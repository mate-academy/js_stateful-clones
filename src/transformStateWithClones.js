'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state }; // Cria uma cópia do estado inicial
  const history = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      // Adiciona ou atualiza propriedades no estado
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key]) => !action.keysToRemove.includes(key),
        ),
      ); // Remove propriedades
    } else if (action.type === 'clear') {
      currentState = {}; // Limpa o estado
    }
    history.push(currentState); // Armazena o estado atualizado no histórico
  });

  return history;
}

module.exports = transformStateWithClones;
