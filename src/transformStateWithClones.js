'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const gen = [];
  const tren = structuredClone(state);

  for (let i = 0; i <= actions.length - 1; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(tren, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      for (let k = 0; k < actions[i].keysToRemove.length; k++) {
        delete tren[actions[i].keysToRemove[k]];
      }
    } else if (actions[i].type === 'clear') {
      for (const key in tren) {
        if (Object.prototype.hasOwnProperty.call(tren, key)) {
          delete tren[key];
        }
      }
    }
    gen.push(structuredClone(tren));
  }

  return gen;
}

module.exports = transformStateWithClones;
