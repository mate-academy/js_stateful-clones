'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectCopy = { ...state };
  const newData = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(objectCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete objectCopy[key];
        }
        break;

      case 'clear':
        for (const key in objectCopy) {
          delete objectCopy[key];
        }
        break;

      default:
        return;
    }

    newData.push({ ...objectCopy });
  }

  return newData;
}

module.exports = transformStateWithClones;
