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
    switch (currentAction.type) {
      case 'addProperties':
        Object.assign(modifyedObj, currentAction.extraData);

        break;

      case 'removeProperties':
        const listToDelete = currentAction.keysToRemove;

        for (let i = 0; i < listToDelete.length; i++) {
          const currentDeleteKey = listToDelete[i];

          delete modifyedObj[currentDeleteKey];
        }

        break;

      case 'clear':
        for (const key in modifyedObj) {
          delete modifyedObj[key];
        }

        break;
    }

    clones.push({ ...modifyedObj });
  }

  return clones;
}

module.exports = transformStateWithClones;
