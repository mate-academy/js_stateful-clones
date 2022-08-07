'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const something = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['type'] === 'addProperties') {
      Object.assign(something, actions[i]['extraData']);
    } else if (actions[i]['type'] === 'removeProperties') {
      const remove = Object.keys(something);

      for (let g = 0; g < remove.length; g++) {
        for (let k = 0; k < actions[i].keysToRemove.length; k++) {
          if (remove[g] === actions[i].keysToRemove[k]) {
            delete something[remove[g]];
          }
        }
      }
    } else if (actions[i]['type'] === 'clear') {
      for (const key of Object.keys(something)) {
        delete something[key];
      }
    }
    arr.push({ ...something });
  }

  return arr;
}

module.exports = transformStateWithClones;
