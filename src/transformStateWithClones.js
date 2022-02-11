'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  let newBox = { ...state };

  for (const change of actions) {
    switch (change.type) {
      case 'addProperties':
        Object.assign(newBox, change.extraData);
        break;

      case 'removeProperties':
        for (const key of change.keysToRemove) {
          delete newBox[key];
        }
        break;

      case 'clear':
        newBox = {};
        break;
    }
    newArr.push({ ...newBox });
  }

  return newArr;
}

module.exports = transformStateWithClones;
