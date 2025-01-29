'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateCopy = { ...state };
  const result = [];

  for (const value of actions) {
    switch (value.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...value.extraData };
        break;
      case 'removeProperties':
        for (const key of value.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
