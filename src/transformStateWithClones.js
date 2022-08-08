'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const clonesArray = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[`${key}`];
      }
    }

    if (action.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    clonesArray.push({ ...clone });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
