'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // Primeiro crie um array vazia
  const history = [];
  // Aqui clonei todo o objeto para a varial currentState
  let currentState = { ...state };

  // um loop para percorrer toda a actions e clonar apenas o que quero
  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        currentState = {};

        break;

      case 'addProperties':
        currentState = { ...currentState, ...extraData };

        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of keysToRemove) {
          delete currentState[key];
        }

        break;
      default:
        break;
    }

    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
