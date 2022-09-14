'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  const copy = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(copy, i.extraData);
      // for (const property in i.extraData) {
      //   copy[property] = i.extraData[property];
      // }
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete copy[key];
      }
    }

    if (i.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }
    newState.push({ ...copy });
  }

  return newState;
}

module.exports = transformStateWithClones;
