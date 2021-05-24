'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArray = [];

  let stateNew = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties' :
        stateNew = {
          ...stateNew, ...extraData,
        };
        break;

      case 'removeProperties' :

        for (const property of keysToRemove) {
          delete stateNew[property];
        }
        break;

      default :

        for (const key in stateNew) {
          delete stateNew[key];
        }
    }

    resultArray.push({ ...stateNew });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
