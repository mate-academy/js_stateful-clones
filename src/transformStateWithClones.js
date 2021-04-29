'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, transforms) {
  const states = [];
  let newState = { ...state };

  for (const { operation, properties } of transforms) {
    switch (operation) {
      case 'addProperties':
        newState = {
          ...newState, ...properties,
        };
        break;
      case 'removeProperties':
        for (const propRemoveKey of properties) {
          delete newState[propRemoveKey];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }

    states.push({ ...newState });
  }

  return states;
}

module.exports = transformStateWithClones;
