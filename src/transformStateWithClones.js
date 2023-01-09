'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newObj = Object.assign({}, state);
  const result = [];

  for (const prop of actions) {
    switch (prop.type) {
      case 'addProperties':
        Object.assign(newObj, prop.extraData);
        result.push({ ...newObj });
        break;
      case 'removeProperties':
        for (const key of prop.keysToRemove) {
          delete newObj[key];
        }
        result.push({ ...newObj });
        break;
      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
