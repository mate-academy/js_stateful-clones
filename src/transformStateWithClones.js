'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arr = [];

  for (const obj of actions) {
    const { type, extraData, keysToRemove } = obj;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;
    }

    const emptyObj = { ...stateCopy };

    arr.push(emptyObj);
  }

  return arr;
}

module.exports = transformStateWithClones;
