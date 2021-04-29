'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const result = [];
  const clone = Object.assign({}, state);

  transforms.forEach(function(item) {
    switch (item.operation) {
      case 'addProperties':
        Object.assign(clone, item.properties);
        break;

      case 'removeProperties':
        for (const prop of item.properties) {
          delete clone[prop];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }

    result.push({ ...clone });
  });

  return result;
}

module.exports = transformStateWithClones;
