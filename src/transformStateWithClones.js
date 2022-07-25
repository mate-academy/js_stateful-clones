'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneArray = [];
  let cloneState = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        for (const key in item.extraData) {
          cloneState[key] = item.extraData[key];
        }

        cloneArray.push({ ...cloneState });
        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete cloneState[key];
        }

        cloneArray.push({ ...cloneState });
        break;

      case 'clear':
        cloneState = {};
        cloneArray.push({ ...cloneState });
        break;
    }
  }

  return cloneArray;
}

module.exports = transformStateWithClones;
