'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObject = { ...state };

  const resultArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in resultObject) {
          delete resultObject[key];
        }
        break;

      case 'addProperties':
        Object.assign(resultObject, extraData);
        break;

      case 'removeProperties':
        const keys = keysToRemove;

        for (const key of keys) {
          delete resultObject[key];
        }
        break;
    }

    resultArray.push({ ...resultObject });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
