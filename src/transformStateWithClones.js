'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  let cloneState = { ...state };
  const states = [];

  for (const { operation, properties } of transforms) {
    switch (operation) {
      case 'addProperties':
        Object.assign(cloneState, properties);
        break;

      case 'removeProperties':
        for (const property of properties) {
          delete cloneState[property];
        };
        break;

      case 'clear':
        cloneState = {};
        break;
    }
    states.push({ ...cloneState });
  }

  return states;
}

module.exports = transformStateWithClones;
