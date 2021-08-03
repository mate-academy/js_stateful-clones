'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // let stateClone =
  // Object.defineProperties({}, Object.getOwnPropertyDescriptors(state));
  const stateClone = Object.assign({}, state);
  const resultStatesArray = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        for (const key in item.extraData) {
          stateClone[key] = item.extraData[key];
        }
        resultStatesArray.push(Object.assign({}, stateClone));

        break;

      case 'removeProperties':
        for (const keyRemove of item.keysToRemove) {
          if (keyRemove in stateClone) {
            delete stateClone[keyRemove];
          }
        }
        resultStatesArray.push(Object.assign({}, stateClone));

        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        resultStatesArray.push(Object.assign({}, stateClone));

        break;
    }
  }

  return resultStatesArray;
}

module.exports = transformStateWithClones;
