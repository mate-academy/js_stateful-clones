'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = { ...state };
  const arrResult = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':

        for (const key in extraData) {
          result[key] = extraData[key];
        };
        break;

      case 'removeProperties':

        for (const toRemove of keysToRemove) {
          for (const key in result) {
            if (toRemove === key) {
              delete result[key];
            };
          };
        };
        break;

      default:
        for (const key in result) {
          delete result[key];
        };
    };

    arrResult.push({ ...result });
  };

  return arrResult;
}

module.exports = transformStateWithClones;
