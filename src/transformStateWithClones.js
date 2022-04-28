'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectCopy = { ...state };
  const statesArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(objectCopy, extraData);
        break;

      case 'removeProperties':
        for (const removeKey of keysToRemove) {
          delete objectCopy[removeKey];
        }
        break;

      case 'clear':
        for (const clearKey in objectCopy) {
          delete objectCopy[clearKey];
        }
        break;

      default:
        throw new Error('Invalid paramater');
    }

    statesArray.push({ ...objectCopy });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
