'use strict';

/**
 * @param {object} state
 * @param {object[]} actions
 *
 * @return {object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = currentState;

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties': {
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;
      }

      default:
        // Se aparecer um tipo desconhecido, mantém o estado (ou poderia lançar erro,
        // mas geralmente os testes não pedem isso).
        nextState = { ...currentState };
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
