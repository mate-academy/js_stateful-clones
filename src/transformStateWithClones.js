'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const transformedArr = [];

  const stateCopy = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(stateCopy, item.extraData);
        transformedArr.push({ ...stateCopy });
        break;
      case 'removeProperties':
        for (const value of item.keysToRemove) {
          delete stateCopy[value];
        }
        transformedArr.push({ ...stateCopy });
        break;
      case 'clear':
        for (const all in stateCopy) {
          delete stateCopy[all];
        }
        transformedArr.push({ ...stateCopy });
        break;
    }
  }

  return transformedArr;
}

module.exports = transformStateWithClones;
