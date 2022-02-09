'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const arr = [];

  actions.forEach(act => {
    switch (act.type) {
      case 'addProperties':
        for (const key in act.extraData) {
          obj[key] = act.extraData[key];
        }
        arr.push({ ...obj });
        break;

      case 'removeProperties':
        for (const key in act.keysToRemove) {
          delete obj[act.keysToRemove[key]];
        }

        arr.push({ ...obj });
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }

        arr.push({ ...obj });
        break;
    }
  });

  return arr;
}

module.exports = transformStateWithClones;
