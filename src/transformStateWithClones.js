'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let modifiedObject = { ...state };

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
        modifiedObject = {};
        break;
      default:
    }
    result.push({ ...modifiedObject });
  });

  return result;
}

module.exports = transformStateWithClones;
