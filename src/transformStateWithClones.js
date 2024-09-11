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

  for (const action of actions) {
    const stateCopy = { ...currentStateCopy };

    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        stateCopy[key] = value;
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (action.type === 'clear') {
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
