'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ('addProperties'):
        Object.assign(copy, extraData);
        break;

      case ('removeProperties'):
        for (const key of keysToRemove) {
          delete copy[key];
        }
        break;

      case ('clear'):
        for (const key in copy) {
          delete copy[key];
        }
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
