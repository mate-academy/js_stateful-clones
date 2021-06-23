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
    switch (action.type) {
      case ('addProperties'):
        Object.assign(stateClone, action.extraData);
        transformedClones.push({ ...stateClone });
        break;

      case ('removeProperties'):
        for (const propertyToRemove of action.keysToRemove) {
          delete stateClone[propertyToRemove];
        }

        transformedClones.push({ ...stateClone });
        break;

      case ('clear'):
        for (const property in stateClone) {
          delete stateClone[property];
        }

        transformedClones.push({ ...stateClone });
        break;
    }
  }

  return transformedClones;
}

module.exports = transformStateWithClones;
