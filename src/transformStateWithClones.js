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
  let addPropertiesClone;
  let removePropertiesClone;
  let clearStateClone;

  for (const action of actions) {
    switch (true) {
      case (action.type === 'addProperties'):
        for (const key in action.extraData) {
          stateClone[key] = action.extraData[key];
        }

        addPropertiesClone = Object.assign({}, stateClone);
        arrayOfClones.push(addPropertiesClone);

        break;

      case (action.type === 'removeProperties'):
        for (const key in action.keysToRemove) {
          delete stateClone[action.keysToRemove[key]];
        }

        removePropertiesClone = Object.assign({}, stateClone);
        arrayOfClones.push(removePropertiesClone);

        break;

      default:
        for (const key in stateClone) {
          delete stateClone[key];
        }

        clearStateClone = Object.assign({}, stateClone);
        arrayOfClones.push(clearStateClone);
    }
  }

  return arrayOfClones;
}

module.exports = transformStateWithClones;
