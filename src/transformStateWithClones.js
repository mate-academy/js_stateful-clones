'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clonedStates = [];
  let newState = { ...state };

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        Object.assign(newState, transform.properties);
        break;

      case 'removeProperties':
        for (const key in transform.properties) {
          delete newState[transform.properties[key]];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error('incorrect property');
    }

    clonedStates.push({ ...newState });
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
