'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let arr = [];
  let current = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      current = { ...current, ...actions[i].extraData };

    } else if (actions[i].type === 'removeProperties') {
      current = { ...current };
      for (let o = 0; o < actions[i].keysToRemove.length; o++) {
        delete current[actions[i].keysToRemove[o]];
      }

    } else if (actions[i].type === 'clear') {
      current = {};
    }

    // 👇 só aqui no final de cada ciclo salva no array
    arr.push({ ...current });
  }

  return arr;
}

module.exports = transformStateWithClones;

