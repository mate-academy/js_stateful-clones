'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let currentStateCopy = { ...state };

  for (const ch of actions) {
    const stateCopy = { ...currentStateCopy };

    if (ch.type === 'addProperties') {
      for (const [key, value] of Object.entries(ch.extraData)) {
        stateCopy[key] = value;
      }
    }

    if (ch.type === 'removeProperties') {
      for (const key of ch.keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (ch.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    result.push(stateCopy);
    currentStateCopy = stateCopy;
  }

  return result;
}

module.exports = transformStateWithClones;
