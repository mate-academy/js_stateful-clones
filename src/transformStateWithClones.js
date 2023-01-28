'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let objectKeeper = { ...state };
  const stateModified = [];

  for (const index of actions) {
    switch (index.type) {
      case 'addProperties':
        for (const key in index.extraData) {
          objectKeeper[key] = index.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of index.keysToRemove) {
          delete objectKeeper[key];
        }
        break;
      case 'clear':
        objectKeeper = {};
        break;
      default:
    }

    stateModified.push({ ...objectKeeper });
  }

  return stateModified;
};

module.exports = transformStateWithClones;
