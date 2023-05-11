'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [Object.assign({}, state)];
  let cloneObj = stateClone[0];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':

        cloneObj = Object.assign({}, cloneObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneObj[key];
        }
        break;

      case 'clear':
        cloneObj = {};
        break;

      default:
        break;
    }
    stateClone.push(cloneObj);
  }

  return stateClone.slice(1);
}

module.exports = transformStateWithClones;
