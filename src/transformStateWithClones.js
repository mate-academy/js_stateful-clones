'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const resultArray = [];

  for (const elem of actions) {
    switch (elem.type) {
      case 'addProperties':
        for (const keys in elem.extraData) {
          copy[keys] = elem.extraData[keys];
        }
        resultArray.push({ ...copy });
        break;
      case 'removeProperties':
        for (const elem1 of elem.keysToRemove) {
          delete copy[elem1];
        }
        resultArray.push({ ...copy });
        break;
      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        resultArray.push({ ...copy });
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
