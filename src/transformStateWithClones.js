'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const cloneArr = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        };
        break;

      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;
    }

    cloneArr.push({ ...stateCopy });
  }

  return cloneArr;
}

module.exports = transformStateWithClones;
