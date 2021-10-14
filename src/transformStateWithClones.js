'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      result.push({});
      stateCopy = {};

      continue;
    }

    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
      result.push({ ...stateCopy });

      continue;
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }

      result.push({ ...stateCopy });

      continue;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
