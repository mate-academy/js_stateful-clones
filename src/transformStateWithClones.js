'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  let newSta = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        newSta = {
          ...newSta,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newSta[key];
        }
        break;

      case 'clear':
        newSta = {};
        break;

      default:
    }

    newArr.push({ ...newSta });
  }

  return newArr;
}
module.exports = transformStateWithClones;
