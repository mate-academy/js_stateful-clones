'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = Object.assign({}, state);
  const resultStatesArray = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        for (const key in item.extraData) {
          stateClone[key] = item.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const keyRemove of item.keysToRemove) {
          if (keyRemove in stateClone) {
            delete stateClone[keyRemove];
          }
        }

        break;

      case 'clear':
        stateClone = {};

        break;
    }

    resultStatesArray.push(Object.assign({}, stateClone));
  }

  return resultStatesArray;
}

module.exports = transformStateWithClones;
