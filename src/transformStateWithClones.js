'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultArray = [];
  const clone = { ...state };

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        Object.assign(clone, transform.properties);
        break;

      case 'removeProperties':
        for (const property of transform.properties) {
          delete clone[property];
        };
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }
    resultArray.push({ ...clone });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
