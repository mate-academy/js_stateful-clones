'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  let stateCopy = { ...state };
  const states = [];

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
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
