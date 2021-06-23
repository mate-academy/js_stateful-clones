'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedClones = [];
  const stateClone = { ...state };

  for (const action of actions) {
    for (const key in action) {
      if (action[key] === 'addProperties') {
        Object.assign(stateClone, action.extraData);
        transformedClones.push({ ...stateClone });
      }

      if (action[key] === 'removeProperties') {
        for (const propertyToRemove of action.keysToRemove) {
          delete stateClone[propertyToRemove];
        }

        transformedClones.push({ ...stateClone });
      }

      if (action[key] === 'clear') {
        for (const property in stateClone) {
          delete stateClone[property];
        }

        transformedClones.push({ ...stateClone });
      }
    }
  }

  return transformedClones;
}

module.exports = transformStateWithClones;
