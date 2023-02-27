'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const arr = [];

  for (const command of actions) {
    if (command.type === 'addProperties') {
      Object.assign(copy, command.extraData);
    }

    if (command.type === 'removeProperties') {
      for (const key of command.keysToRemove) {
        delete copy[key];
      }
    }

    if (command.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }
    arr.push({ ...copy });
  }

  return (arr);
}

module.exports = transformStateWithClones;
