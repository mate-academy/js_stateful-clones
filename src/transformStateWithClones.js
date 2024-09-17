'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const modifiedObject = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(modifiedObject, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete modifiedObject[key];
        });
        break;

      case 'clear':
        for (const key in modifiedObject) {
          delete modifiedObject[key];
        }
        break;

      default:
        throw new Error('Invalid type');
    }
    stateArray.push({ ...modifiedObject });
  });

  return stateArray;
}

module.exports = transformStateWithClones;
