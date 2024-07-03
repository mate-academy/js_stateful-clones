'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const item of actions) {
    const stateCopy = { ...currentState };

    if (item.type === 'addProperties') {
      Object.assign(stateCopy, { ...item.extraData });
    }

    if (item.type === 'removeProperties') {
      for (const el of item.keysToRemove) {
        delete stateCopy[el];
      }
    }

    if (item.type === 'clear') {
      for (const param in stateCopy) {
        delete stateCopy[param];
      }
    }

    result.push(stateCopy);
    currentState = stateCopy;
  }

  return result;
}

module.exports = transformStateWithClones;
