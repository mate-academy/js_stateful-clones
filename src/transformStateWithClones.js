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
    switch (action.type) {
      case 'addProperties':
        const extraData = action.extraData;

        for (const key in extraData) {
          result[key] = extraData[key];
        };
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const toRemove of keysToRemove) {
          for (const key in result) {
            if (toRemove === key) {
              delete result[key];
            };
          };
        };
        break;

      case 'clear':
        for (const key in result) {
          delete result[key];
        };
    };

    const stage = { ...result };

    arrResult.push(stage);
  };

  return arrResult;
}

module.exports = transformStateWithClones;
