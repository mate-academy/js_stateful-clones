'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedArr = [];

  const stateObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateObj[key]) {
            delete stateObj[key];
          }
        }
        break;

      case 'clear':
        for (const key in stateObj) {
          delete stateObj[key];
        }
        break;

      default:
        throw new Error();
    }

    transformedArr.push({ ...stateObj });
  }

  return transformedArr;
}

module.exports = transformStateWithClones;
