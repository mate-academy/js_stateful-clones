'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let estadoAtual = { ...state };
  const armario = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        estadoAtual = {};
        break;

      case 'addProperties':
        estadoAtual = {
          ...estadoAtual,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete estadoAtual[key];
        }
        break;
    }

    armario.push({ ...estadoAtual });
  }

  return armario;
}

module.exports = transformStateWithClones;
