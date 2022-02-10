'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const resultArray = [];

  for (const elem of actions) {
    switch (elem.type) {
      case 'addProperties':
        for (const keys in elem.extraData) {
          copy[keys] = elem.extraData[keys];
        }
        break;
      case 'removeProperties':
        for (const elem1 of elem.keysToRemove) {
          delete copy[elem1];
        }
        break;

      case 'clear':
        copy = {};
    }
    resultArray.push({ ...copy });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
