'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayWithClone = [];
  const cloneObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneObject, action.extraData);
        break;

      case 'removeProperties':
        for (const deleteKeys of action.keysToRemove) {
          delete
          cloneObject[deleteKeys];
        }
        break;

      case 'clear':
        for (const clearKeys in cloneObject) {
          delete
          cloneObject[clearKeys];
        }
        break;
    }

    arrayWithClone.push({ ...cloneObject });
  }

  return arrayWithClone;
}

module.exports = transformStateWithClones;
