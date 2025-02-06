'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let newObj = { ...state };

  for (const x of actions) {
    switch (x.type) {
      case 'addProperties':
        Object.assign(newObj, x.extraData);
        break;

      case 'removeProperties':
        for (const z of x.keysToRemove) {
          delete newObj[z];
        }
        break;

      case 'clear':
        newObj = {};
        break;

      default:
        return 'error';
    }

    newArray.push({ ...newObj });
  }

  return newArray;
}
module.exports = transformStateWithClones;
