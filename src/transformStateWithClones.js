'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let stateCopy = { ...state };

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        Object.assign(stateCopy, transform.properties);
        break;
      case 'removeProperties':
        for (const property of transform.properties) {
          delete stateCopy[property];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
