'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const arrayCopy = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copy[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }

    arrayCopy.push({ ...copy });
  }

  return arrayCopy;
}

module.exports = transformStateWithClones;
