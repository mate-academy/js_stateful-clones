'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const obj = { ...state };
  const resultArr = [];

  for (const num in actions) {
    const action = actions[num];

    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete obj[key];
        }
        break;
      case 'clear':
        for (const key in obj) {
          delete obj[key];
        };
        break;
    }
    resultArr.push({ ...obj });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
