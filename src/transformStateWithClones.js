'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let next = { ...state };
  const clone = [];

  for (const char of actions) {
    next = { ...next };
    clone.push(next);

    switch (char.type) {
      case 'addProperties':
        Object.assign(next, char.extraData);
        break;

      case 'removeProperties':
        for (const key of char.keysToRemove) {
          delete next[key];
        }
        break;

      case 'clear':
        for (const key in next) {
          delete next[key];
        }
    }
  }

  return clone;
}

module.exports = transformStateWithClones;
