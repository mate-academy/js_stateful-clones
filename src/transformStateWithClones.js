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
  const stateClone = { ...state };

  for (const transform of transforms) {
    if (transform.operation === 'addProperties') {
      Object.assign(stateClone, transform.properties);
    } else if (transform.operation === 'removeProperties') {
      for (const property of transform.properties) {
        delete stateClone[property];
      }
    } else if (transform.operation === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }
    result.push({ ...stateClone });
  }

  return result;
}
module.exports = transformStateWithClones;
