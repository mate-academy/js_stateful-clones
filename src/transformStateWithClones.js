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

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(stateCopy, obj.extraData);
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        if (key in stateCopy) {
          delete stateCopy[key];
        }
      }
    } else if (obj.type === 'clear') {
      stateCopy = {};
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
