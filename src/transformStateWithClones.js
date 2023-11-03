'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const newStates = [];
  let cloneState = { ...state };

  for (const transform of transforms) {
    switch (transform.type) {
      case 'addProperties':
        Object.assign(cloneState, transform.extraData);
        break;

      case 'removeProperties':
        for (const key of transform.keysToRemove) {
          delete cloneState[key];
        }

        break;

      case 'clear':
        cloneState = {};
        break;
    }

    newStates.push({ ...cloneState });
  }

  return newStates;
}
module.exports = transformStateWithClones;
