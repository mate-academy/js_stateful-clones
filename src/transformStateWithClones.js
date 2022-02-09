'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let obj = { ...state };
  const arr = [];

  actions.forEach(act => {
    switch (act.type) {
      case 'addProperties':
        for (const key in act.extraData) {
          obj[key] = act.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key in act.keysToRemove) {
          delete obj[act.keysToRemove[key]];
        }
        break;

      case 'clear':
        obj = {};
        break;
    }

    arr.push({ ...obj });
  });

  return arr;
}

module.exports = transformStateWithClones;
