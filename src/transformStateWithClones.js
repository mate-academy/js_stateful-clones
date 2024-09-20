'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
      result.push({ ...stateCopy });

      continue;
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete stateCopy[keyToRemove];
      }

      result.push({ ...stateCopy });

      continue;
    }

    if (action.type === 'clear') {
      stateCopy = {};
      result.push({});

      continue;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
