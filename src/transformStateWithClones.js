'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneState = { ...state };
  const result = [];

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
        for (const key in cloneState) {
          delete cloneState[key];
        };
    }
    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
