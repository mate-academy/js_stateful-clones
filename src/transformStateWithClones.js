'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let obj = { ...state };
  const result = [];

  actions.forEach((element) => {
    switch (element.type) {
      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
      case 'removeProperties':
        element.keysToRemove.forEach((prop) => {
          delete obj[prop];
        });
        break;
      case 'addProperties':
        obj = {
          ...obj, ...element.extraData,
        };
        break;
      default:
        return result;
    }
    result.push({ ...obj });
  });

  return result;
}

module.exports = transformStateWithClones;
