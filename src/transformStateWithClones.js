'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const object of actions) {
    if (object.type === 'addProperties') {
      Object.assign(stateCopy, object.extraData);
      result.push({ ...stateCopy });
    }

    if (object.type === 'removeProperties') {
      for (const name of object.keysToRemove) {
        delete stateCopy[name];
      }
      result.push({ ...stateCopy });
    }

    if (object.type === 'clear') {
      for (const prop in stateCopy) {
        delete stateCopy[prop];
      }
      result.push({ ...stateCopy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
