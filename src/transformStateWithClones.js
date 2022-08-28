'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let resultStateObject = { ...state };
  const resultStateArray = [];

  for (const result of actions) {
    switch (result.type) {
      case ('addProperties'):
        const mas = Object.keys(result.extraData);

        for (const key of mas) {
          resultStateObject[key] = result.extraData[key];
        }
        break;

      case ('removeProperties'):
        for (const key of result.keysToRemove) {
          delete resultStateObject[key];
        }
        break;

      case ('clear'):
        resultStateObject = {};
        break;
    }

    const copy = { ...resultStateObject };

    resultStateArray.push(copy);
  }

  return resultStateArray;
}

module.exports = transformStateWithClones;
