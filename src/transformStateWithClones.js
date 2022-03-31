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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
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
