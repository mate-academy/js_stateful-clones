'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateObject = { ...state };
  const result = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(stateObject, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const removeItem of key.keysToRemove) {
        delete stateObject[removeItem];
      }
    }

    if (key.type === 'clear') {
      for (const remove in stateObject) {
        delete stateObject[remove];
      }
    }

    result.push({ ...stateObject });
  }

  return result;
}

module.exports = transformStateWithClones;
