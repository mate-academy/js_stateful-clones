'use strict';

/**
 * @param {objetoect} state
 * @param {objetoect[]} actions
 *
 * @return {objetoect[]}
 */
function transformStateWithClones(state, actions) {
  let objeto = { ...state };
  const novo = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
        objeto = { ...objeto, ...extraData };
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete objeto[key];
      }
    } else {
      objeto = {};
    }
    
    novo.push({ ...objeto });
  }

  return novo;
}

module.exports = transformStateWithClones;
