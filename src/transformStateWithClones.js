'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersionsArray = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToDelete of action.keysToRemove) {
          delete stateClone[keyToDelete];
        }
        break;

      case 'clear':
        Object.keys(stateClone)
          .forEach(key => {
            delete stateClone[key];
          });
        break;

      default:
        break;
    }
    stateVersionsArray.push({ ...stateClone });
  }

  return stateVersionsArray;
}

module.exports = transformStateWithClones;
