'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const obj = cloneObj(state);

  for (const item in actions) {
    switch (actions[item].type) {
      case 'addProperties':
        for (const key in actions[item].extraData) {
          obj[key] = actions[item].extraData[key];
        }
        resultArray.push({ ...obj });
        break;

      case 'removeProperties':
        for (const key in actions[item].keysToRemove) {
          delete obj[actions[item].keysToRemove[key]];
        }

        resultArray.push({ ...obj });
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        resultArray.push({ ...obj });
        break;
    }
  }

  return resultArray;
}

function cloneObj(obj) {
  return { ...obj };
}

module.exports = transformStateWithClones;
