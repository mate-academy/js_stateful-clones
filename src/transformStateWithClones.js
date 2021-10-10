'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArr = [];
  let copyState = {
    ...state,
  };

  for (const obj of actions) {
    const { type, extraData, keysToRemove } = obj;

    if (type === 'addProperties') {
      const addObj = Object.assign({}, copyState, extraData);

      resultArr.push(addObj);
      copyState = addObj;
    }

    if (type === 'removeProperties') {
      const removeObj = {
        ...copyState,
      };

      for (const property of keysToRemove) {
        delete removeObj[property];
      }

      resultArr.push(removeObj);
      copyState = removeObj;
    }

    if (type === 'clear') {
      const clearObj = {
        ...copyState,
      };

      for (const key in clearObj) {
        delete clearObj[key];
      }

      resultArr.push(clearObj);
      copyState = clearObj;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
