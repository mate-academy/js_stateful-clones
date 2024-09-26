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

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(stateCopy, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (i.type === 'clear') {
      stateCopy = {};
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
