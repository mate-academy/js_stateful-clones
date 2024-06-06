'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const ACTION_TYPES = {
  add: 'addProperties',
  remove: 'removeProperties',
  clear: 'clear',
};

function transformStateWithClones(state, actions) {
  const history = [];

  for (const { type, extraData, keysToRemove } of actions) {
    const stateCopy = { ...(history.at(-1) ?? state) };
    let historyItem = {};

    switch (type) {
      case ACTION_TYPES.add: {
        historyItem = { ...stateCopy, ...extraData };
        break;
      }

      case ACTION_TYPES.remove: {
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }

        historyItem = stateCopy;
        break;
      }

      case ACTION_TYPES.clear: {
        break;
      }

      default: {
        throw new Error('Unexpected action type!');
      }
    }

    history.push(historyItem);
  }

  return history;
}

module.exports = transformStateWithClones;
