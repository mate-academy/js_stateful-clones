'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  let stateCopy = { ...state };
  const operationsHistory = [];

  for (const transformation of transforms) {
    switch (transformation.operation) {
      case 'addProperties':
        Object.assign(stateCopy,
          transformation.properties);
        break;

      case 'clear':
        stateCopy = {};
        break;

      case 'removeProperties':
        for (const key of transformation.properties) {
          delete stateCopy[key];
        }
        break;
    }
    operationsHistory.push({ ...stateCopy });
  }

  return operationsHistory;
}

module.exports = transformStateWithClones;
