'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = { ...state };
  const clonesArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(clones, extraData);
    }

    if (type === 'clear') {
      for (const clone in clones) {
        delete clones[clone];
      }
    }

    if (type === 'removeProperties') {
      for (const removableKey of keysToRemove) {
        delete clones[removableKey];
      }
    }

    clonesArray.push({ ...clones });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
