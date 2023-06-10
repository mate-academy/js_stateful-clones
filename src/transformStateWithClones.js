'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  actions.forEach((item, index, array) => {
    let newObj;

    switch (item.type) {
      case 'addProperties':
        newObj = result.length === 0
          ? { ...state }
          : { ...result[result.length - 1] };

        for (const key in item.extraData) {
          newObj[key] = item.extraData[key];
        }
        result.push(newObj);
        break;

      case 'removeProperties':
        const newObjRemove = result.length === 0
          ? { ...state }
          : { ...result[result.length - 1] };

        item.keysToRemove.forEach((key) => {
          if (newObjRemove[key]) {
            delete newObjRemove[key];
          }
        });
        result.push(newObjRemove);
        break;

      case 'clear':
        const newObjClear = result.length === 0
          ? { ...state }
          : { ...result[result.length - 1] };

        Object.keys(newObjClear).forEach((key) => {
          delete newObjClear[key];
        });
        result.push(newObjClear);
        break;

      default:
        break;
    }
  });

  return result;
}

module.exports = transformStateWithClones;
