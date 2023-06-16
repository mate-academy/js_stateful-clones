'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newObj = { ...state };

  actions.forEach((item) => {
    switch (item.type) {
      case 'addProperties':
        newObj = { ...newObj };

        for (const key in item.extraData) {
          newObj[key] = item.extraData[key];
        }
        result.push({ ...newObj });
        break;

      case 'removeProperties':
        newObj = { ...newObj };

        item.keysToRemove.forEach((key) => {
          if (key in newObj) {
            delete newObj[key];
          }
        });
        result.push({ ...newObj });
        break;

      case 'clear':
        newObj = {};
        result.push({ ...newObj });
        break;

      default:
        break;
    }
  });

  return result;
}

module.exports = transformStateWithClones;
