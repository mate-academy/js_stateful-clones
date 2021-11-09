'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObj = Object.assign({}, state);
  const resArr = [];

  for (const prop of actions) {
    if (prop.type === 'addProperties') {
      Object.assign(newObj, prop.extraData);
    }

    if (prop.type === 'removeProperties') {
      for (const rem of prop.keysToRemove) {
        for (const key in newObj) {
          if (key === rem) {
            delete newObj[key];
          }
        }
      }
    }

    if (prop.type === 'clear') {
      for (const key in newObj) {
        delete newObj[key];
      }
    }

    resArr.push({ ...newObj });
  }

  return resArr;
}

module.exports = transformStateWithClones;
