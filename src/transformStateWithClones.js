'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const clone = { ...state };
  const history = [];

  transforms.forEach(transform => {
    const { operation, properties } = transform;

    switch (operation) {
      case 'addProperties': {
        Object.assign(clone, properties);
        break;
      }

      case 'removeProperties': {
        for (let j = 0; j < properties.length; j++) {
          const removeKey = properties[j];

          delete clone[removeKey];
        }
        break;
      }

      case 'clear': {
        for (const key in clone) {
          delete clone[key];
        }
        break;
      }
    }
    history.push({ ...clone });
  });

  return history;
}

module.exports = transformStateWithClones;
