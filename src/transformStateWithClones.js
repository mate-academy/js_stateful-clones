'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(newState, obj.extraData);
      result.push({ ...newState });
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        if (newState[key] !== undefined) {
          delete newState[key];
        }
      }
      result.push({ ...newState });
    }

    if (obj.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
