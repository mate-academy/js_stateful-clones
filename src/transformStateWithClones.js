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
    if (index.type === 'addProperties') {
      const localTemporaryObject = { ...objectKeeper };

      for (const key in index.extraData) {
        localTemporaryObject[key] = index.extraData[key];
      }

      objectKeeper = { ...localTemporaryObject };
      stateModified.push(localTemporaryObject);
    }

    if (index.type === 'removeProperties') {
      for (const key of index.keysToRemove) {
        delete objectKeeper[key];
      }

      const localTemporaryObject = { ...objectKeeper };

      stateModified.push(localTemporaryObject);
    }

    if (index.type === 'clear') {
      objectKeeper = {};
      stateModified.push({ ...objectKeeper });
    }
  }

  return stateModified;
};

module.exports = transformStateWithClones;
