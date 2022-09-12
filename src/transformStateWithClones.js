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
  const arr = [];

  for (const action of actions) {
    const object = {};

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
    arr.push(Object.assign(object, copyState));
  }

  return arr;
}

module.exports = transformStateWithClones;
