'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  const stateArray = [];

  for (const action of actions) {
    const objectClone = {};

    switch (action.type) {
      case 'addProperties' :
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete copyState[remove];
        }
        break;

      case 'clear' :
        for (const properties in copyState) {
          delete copyState[properties];
        }
        break;
    }
    stateArray.push(Object.assign(objectClone, copyState));
  }

  return stateArray;
}

module.exports = transformStateWithClones;
