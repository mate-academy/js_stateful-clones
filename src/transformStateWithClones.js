'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let arr = [];
  let cloneState = {...state};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const rem of action.keysToRemove) {
          delete cloneState[rem];
        }
        break;

      case 'clear':
        cloneState = {};
        break;

      default:
        return arr;
    }

    arr.push({...cloneState});
  }

  return arr;
}

module.exports = transformStateWithClones;
