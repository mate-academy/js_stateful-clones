'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const resultArray = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(stateCopy, item.extraData);
        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete stateCopy[key];
        };
        break;

      case 'clear':
        stateCopy = {};
    }
    resultArray.push({ ...stateCopy });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
