'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const command of actions) {
    switch (command.type) {
      case 'addProperties':
        for (const key in command.extraData) {
          stateCopy[key] = command.extraData[key];
        };
        break;

      case 'removeProperties':
        for (const key of command.keysToRemove) {
          delete stateCopy[key];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
