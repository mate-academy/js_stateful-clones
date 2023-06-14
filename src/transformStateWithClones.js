'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCloneObj = { ...state };
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCloneObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateCloneObj.hasOwnProperty(key)) {
            delete stateCloneObj[key];
          }
        }
        break;

      case 'clear':
        for (const stateCloneObjKey in stateCloneObj) {
          delete stateCloneObj[stateCloneObjKey];
        }
        break;

      default:
        throw new Error('invalid action');
    }

    resultArr.push({ ...stateCloneObj });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
