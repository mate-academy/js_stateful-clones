'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, transforms) {
  const statesHistory = [];
  let stateCopy = { ...state };

  for (const { properties, operation } of transforms) {
    switch (operation) {
      case 'addProperties':
        for (const key in properties) {
          stateCopy[key] = properties[key];
        }
        break;
      case 'removeProperties':
        for (const fieldName of properties) {
          if (fieldName in stateCopy) {
            delete stateCopy[fieldName];
          }
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default: throw new Error('operation is not defined');
    }
    statesHistory.push({ ...stateCopy });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
