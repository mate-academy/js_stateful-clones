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
    switch (element.type) {
      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        result.push({ ...obj });
        break;
      case 'removeProperties':
        element.keysToRemove.forEach(prop => {
          delete obj[prop];
        });
        result.push({ ...obj });
        break;
      default:
        Object.assign(obj, element.extraData);
        result.push({ ...obj });
    }
  });

  return result;
}

module.exports = transformStateWithClones;
