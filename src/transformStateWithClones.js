'use strict';

/**
 * @param {Object} stateClone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = {};

  Object.assign(stateClone, { ...state });

  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateClone[property];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    resultArray.push({ ...stateClone });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
