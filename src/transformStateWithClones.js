'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let resultObj = { ...state };

  for (const elem of actions) {
    switch (elem.type) {
      case 'addProperties':
        Object.assign(resultObj, elem.extraData);

        const resultObj2 = { ...resultObj };

        result.push(resultObj2);

        break;

      case 'removeProperties':
        for (const key of elem.keysToRemove) {
          delete resultObj[key];
        }

        const resultObj3 = { ...resultObj };

        result.push(resultObj3);
        break;

      case 'clear':
        resultObj = {};

        const resultObj4 = { ...resultObj };

        result.push(resultObj4);

        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
