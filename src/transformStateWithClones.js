'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const states = [];

  for (const transform of transforms) {
    const { properties, operation } = transform;

    switch (operation) {
      case 'addProperties':
        for (const key in properties) {
          stateCopy[key] = properties[key];
        }
        break;
      case 'removeProperties':
        for (const property of properties) {
          delete stateCopy[property];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
