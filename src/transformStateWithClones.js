/* eslint-disable max-len */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateActions = [];
  let newState = { ...state }; // Cópia do estado inicial

  for (const action of actions) {
    if (action.type === 'addProperties') {
      // Cria uma nova cópia e adiciona novas propriedades
      newState = { ...newState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      // Cópia do estado atual
      newState = { ...newState };
      // Remove as chaves
      action.keysToRemove.forEach((key) => delete newState[key]);
    }

    if (action.type === 'clear') {
      // Cria um novo estado vazio
      newState = {};
    }

    // Adiciona uma cópia do novo estado
    stateActions.push({ ...newState });
  }

  return stateActions;
}

module.exports = transformStateWithClones;
