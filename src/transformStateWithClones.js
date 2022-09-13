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

  Object.assign(stateClone, state);

  const resultArray = [];

  for (const action of actions) {

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        resultArray.push(Object.assign({}, stateClone));
        break;

      case 'removeProperties':
        for (const property in stateClone) {
          if (action.keysToRemove.includes(property)) {
            delete stateClone[property];
          }
        }
        resultArray.push(Object.assign({}, stateClone));
        break;

      case 'clear':
        for (const key in stateClone) {
          if (stateClone.hasOwnProperty(key)) {
            delete stateClone[key];
          }
        }
        resultArray.push(Object.assign({}, stateClone));
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
