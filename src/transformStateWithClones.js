'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const el of actions) {
    if (el.type === 'addProperties') {
      Object.assign(stateCopy, el.extraData);
    }

    if (el.type === 'removeProperties') {
      for (const item of el.keysToRemove) {
        delete stateCopy[item];
      }
    }

    if (el.type === 'clear') {
      for (const item in stateCopy) {
        delete stateCopy[item];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
