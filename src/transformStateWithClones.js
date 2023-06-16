'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clearObject = [];
  const modifiedObject = { ...state };

  actions.forEach(action => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(modifiedObject, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete modifiedObject[key];
        }
        break;
      case 'clear':
        for (const key in modifiedObject) {
          delete modifiedObject[key];
        }
        break;
      default:
    }
    clearObject.push({ ...modifiedObject });
  });

  return clearObject;
}

module.exports = transformStateWithClones;
