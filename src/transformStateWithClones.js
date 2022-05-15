'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = { ...state };
  const resultArr = [];

  for (const key of actions) {
    switch (key.type) {
      case 'clear':
        for (const wey in result) {
          delete result[wey];
        }
        break;

      case 'addProperties':
        Object.assign(result, key.extraData);
        break;

      case 'removeProperties':
        for (const sey of key.keysToRemove) {
          delete result[sey];
        }
    }

    resultArr.push({ ...result });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
