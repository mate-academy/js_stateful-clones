'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const transformedStates = [];

  for (const { operation, properties } of transforms) {
    switch (operation) {
      case 'addProperties':
        Object.assign(newState, properties);
        break;
      case 'removeProperties':
        for (const key of properties) {
          delete newState[key];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
      default:
        break;
    }
    transformedStates.push({ ...newState });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
