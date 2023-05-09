'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const state2 = { ...state };
  const arr = [];

  for (const ch of actions) {
    const { type, keysToRemove, extraData } = ch;
    let state3 = {};

    if (type === 'addProperties') {
      Object.assign(state2, extraData);
      // arr.push(state2)
    }

    if (type === 'removeProperties') {
      for (const char of keysToRemove) {
        delete state2[char];
      }
      // console.log(state2)
      // arr.push(state2)
    }

    if (type === 'clear') {
      for (const prop in state2) {
        if (state2.hasOwnProperty(prop)) {
          delete state2[prop];
        }
      }
    }

    state3 = { ...state2 };
    // console.log(state3)

    arr.push(state3);
  }

  return arr;
}

module.exports = transformStateWithClones;
