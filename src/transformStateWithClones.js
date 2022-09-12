'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const Arr = [];
  let clone = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        for (const key in item.extraData) {
          clone[key] = item.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete clone[key];
        }

        break;

      case 'clear':
        clone = {};

        break;
    }
    Arr.push({ ...clone });
  }

  return Arr;
}

module.exports = transformStateWithClones;
