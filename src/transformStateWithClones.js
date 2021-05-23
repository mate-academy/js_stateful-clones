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

  for (const i of actions) {
    switch (true) {
      case i['type'] === 'addProperties' :
        stateNew = {
          ...stateNew, ...i['extraData'],
        };
        break;

      case i['type'] === 'removeProperties' :

        for (const property of i['keysToRemove']) {
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
