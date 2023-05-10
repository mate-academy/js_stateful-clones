'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [Object.assign({}, state)];

  for (const action of actions) {
    let cloneObj = Object.assign({}, stateClone[stateClone.length - 1]);

    switch (action.type) {
      case 'addProperties':

        cloneObj = {
          ...cloneObj,
          ...action.extraData,
        };
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
