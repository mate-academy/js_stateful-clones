'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let novo = { ...state };
  const historicoEstados = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      novo = {};
    } else if (actions[i].type === 'addProperties') {
      const extraData = actions[i].extraData;

      for (const key in extraData) {
        novo[key] = extraData[key];
      }
    } else if (actions[i].type === 'removeProperties') {
      const remove = actions[i].keysToRemove;

      for (const key of remove) {
        delete novo[key];
      }
    }
    historicoEstados.push({ ...novo });
  }

  return historicoEstados;
}

module.exports = transformStateWithClones;
