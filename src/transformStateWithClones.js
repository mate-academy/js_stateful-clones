'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStateO = { ...state };
  const resultStateM = [];

  for (const result of actions) {
    switch (true) {
      case (result.type === 'addProperties'):
        const mas = Object.keys(result.extraData);

        for (const key of mas) {
          resultStateO[key] = result.extraData[key];
        }
        break;

      case (result.type === 'removeProperties'):
        for (const key of result.keysToRemove) {
          delete resultStateO[key];
        }
        break;

      case (result.type === 'clear'):
        for (const key in resultStateO) {
          delete resultStateO[key];
        }
        break;
    }

    const copy = { ...resultStateO };

    resultStateM.push(copy);
  }

  return resultStateM;
}

module.exports = transformStateWithClones;
