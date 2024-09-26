'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = Object.assign({}, state);
  const result = [];

  for (const value of transforms) {
    switch (value.operation) {
      case 'addProperties':
        for (const prop in value.properties) {
          clone[prop] = value.properties[prop];
        }
        break;

      case 'removeProperties':
        for (const prop of value.properties) {
          if (prop in clone) {
            delete clone[prop];
          }
        }
        break;

      case 'clear':
        for (const prop in clone) {
          delete clone[prop];
        }
        break;
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
