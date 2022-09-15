'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {
    ...state,
  };

  const result = [];

  for (const step of actions) {
    if (step.type === 'addProperties') {
      Object.assign(stateCopy, step.extraData);
    }

    if (step.type === 'removeProperties') {
      const keysToDelete = step.keysToRemove;

      for (const key of keysToDelete) {
        delete stateCopy[key];
      }
    }

    if (step.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
