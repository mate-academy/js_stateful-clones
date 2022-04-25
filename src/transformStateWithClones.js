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
    switch (action.type) {
      case 'addProperties':
        Object.assign(objectCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
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

    const updatedState = { ...objectCopy };

    statesArray.push(updatedState);
  }

  return statesArray;
}

module.exports = transformStateWithClones;
