'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const result = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(obj, action.extraData);
        break;

      case action.type === 'removeProperties':
        for (const del of action.keysToRemove) {
          delete obj[del];
        }
        break;

      case action.type === 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
    }
    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
