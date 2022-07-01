'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = {
    ...state,
  };
  const actionsHistory = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        for (const char in extraData) {
          copy[char] = extraData[char];
        }

        break;

      case 'removeProperties':
        for (const char in copy) {
          if (keysToRemove.includes(char)) {
            delete copy[char];
          }
        }

        break;

      case 'clear':
        for (const char in copy) {
          delete copy[char];
        }

        break;
    }

    actionsHistory.push({
      ...copy,
    });
  }

  return actionsHistory;
}

module.exports = transformStateWithClones;
