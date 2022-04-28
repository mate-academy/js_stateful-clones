'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifyedObj = { ...state };
  const clones = [];

  for (const currentAction of actions) {
    if (currentAction.type === 'addProperties') {
      Object.assign(modifyedObj, currentAction['extraData']);
    }

    if (currentAction.type === 'removeProperties') {
      const listToDelete = currentAction['keysToRemove'];

      for (let i = 0; i < listToDelete.length; i++) {
        const currentDeleteKey = listToDelete[i];

        if (modifyedObj.hasOwnProperty(currentDeleteKey)) {
          delete modifyedObj[currentDeleteKey];
        }
      }
    }

    if (currentAction.type === 'clear') {
      for (const key in modifyedObj) {
        delete modifyedObj[key];
      }
    }

    clones.push({ ...modifyedObj });
  }

  return clones;
}

module.exports = transformStateWithClones;
