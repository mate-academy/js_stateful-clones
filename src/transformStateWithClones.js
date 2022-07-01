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

        actionsHistory.push({
          ...copy,
        });

        break;

      case 'removeProperties':
        for (const char in copy) {
          if (keysToRemove.includes(char)) {
            delete copy[char];
          }
        }

        actionsHistory.push({
          ...copy,
        });

        break;

      case 'clear':
        for (const char in copy) {
          delete copy[char];
        }

        actionsHistory.push({
          ...copy,
        });

        break;
    }
  }

  return actionsHistory;
}

module.exports = transformStateWithClones;
