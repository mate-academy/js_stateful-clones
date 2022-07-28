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

        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete cloneState[key];
        }

        break;

      case 'clear':
        cloneState = {};

        break;
    }
    cloneArray.push({ ...cloneState });
  }

  return cloneArray;
}

module.exports = transformStateWithClones;
