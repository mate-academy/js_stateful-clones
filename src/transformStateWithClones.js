'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentObject = { ...state };
  const finalArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentObject, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentObject[key];
        }
        break;

      case 'clear':
        for (const key in currentObject) {
          delete currentObject[key];
        }
        break;

      default:
        window.alert('Here is something wrong!');
    }

    finalArray.push({ ...currentObject });
  }

  return finalArray;
}

module.exports = transformStateWithClones;
