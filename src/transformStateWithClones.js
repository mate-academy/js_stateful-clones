'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfClones = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (true) {
      case (action.type === 'addProperties'):
        for (const key in action.extraData) {
          stateClone[key] = action.extraData[key];
        }

        const addPropertiesClone = Object.assign({}, stateClone);

        arrayOfClones.push(addPropertiesClone);

        break;

      case (action.type === 'removeProperties'):
        for (const key in action.keysToRemove) {
          delete stateClone[action.keysToRemove[key]];
        }

        const removePropertiesClone = Object.assign({}, stateClone);

        arrayOfClones.push(removePropertiesClone);

        break;

      default:
        for (const key in stateClone) {
          delete stateClone[key];
        }

        const clearStateClone = Object.assign({}, stateClone);

        arrayOfClones.push(clearStateClone);
    }
  }

  return arrayOfClones;
}

module.exports = transformStateWithClones;
