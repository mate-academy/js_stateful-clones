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
  const clone = Object.assign({}, state);

  for (const { operation, properties } of transforms) {
    switch (operation) {
      case 'addProperties': {
        Object.assign(
          clone,
          properties
        );
        break;
      }

      case 'removeProperties': {
        for (const property of properties) {
          delete clone[property];
        }

        break;
      }

      case 'clear': {
        for (const element in clone) {
          delete clone[element];
        };

        break;
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
