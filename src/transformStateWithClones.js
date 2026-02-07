'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        // Reseta para um objeto vazio
        stateCopy = {};
        break;
        
      default:
        break;
    }

    // Atualizamos o estado atual para a próxima volta do loop
    currentState = stateCopy;

    // Adicionamos a cópia deste passo ao array de histórico
    history.push(stateCopy);
  }

  return history;
}

module.exports = transformStateWithClones;
