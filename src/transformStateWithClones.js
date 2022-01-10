'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArr = [];
  let newObj = {
    ...state,
  };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(newObj, obj.extraData);
        break;

      case 'removeProperties':
        for (const values of obj.keysToRemove) {
          delete newObj[values];
        }
        break;

      case 'clear':
        newObj = {};
        break;
    }
    stateArr.push({ ...newObj });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
