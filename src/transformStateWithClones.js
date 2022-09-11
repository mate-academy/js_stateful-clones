'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const command of actions) {
    if (command.type === 'addProperties') {
      for (const key in command.extraData) {
        newState[key] = command.extraData[key];
      }
    }

    if (command.type === 'removeProperties') {
      for (const key of command.keysToRemove) {
        delete newState[key];
      }
    }

    if (command.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
