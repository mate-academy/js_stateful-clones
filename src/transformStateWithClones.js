'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const stateCopy = {
    ...state,
  };

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        for (const key in transform.properties) {
          stateCopy[key] = transform.properties[key];
        }

        break;
      case 'removeProperties':
        for (const key in transform.properties) {
          delete stateCopy[transform.properties[key]];
        }

        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;
    }

    arr.push({
      ...stateCopy,
    });
  }

  return arr;
}

module.exports = transformStateWithClones;
