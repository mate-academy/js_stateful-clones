'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = Object.assign({}, state);
  const result = [];

  actions.forEach(element => {
    if (element['type'] === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
      result.push({ ...obj });
    } else if (element['type'] === 'removeProperties') {
      element['keysToRemove'].forEach(prop => {
        delete obj[prop];
      });
      result.push({ ...obj });
    } else {
      Object.assign(obj, element['extraData']);
      result.push({ ...obj });
    }
  });

  return result;
}

module.exports = transformStateWithClones;
