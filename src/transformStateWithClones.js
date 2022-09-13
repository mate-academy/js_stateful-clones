'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let addObj = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    if (type === 'addProperties') {
      addObj = {
        ...addObj,
        ...extraData,
      };

      resultArray.push({
        ...addObj, ...extraData,
      });
    } else if (type === 'removeProperties') {
      for (const item of keysToRemove) {
        if (Object.keys(addObj).filter(elem => elem === item)) {
          delete addObj[item];
        }
      }

      resultArray.push({
        ...addObj, ...extraData,
      });
    } else {
      for (const bit of Object.keys(addObj)) {
        delete addObj[bit];
      }

      resultArray.push(addObj);
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
