'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const resultArray = [];

  for (const act of actions) {
    const { type, extraData, keysToRemove } = act;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneState[key];
        }
        break;

      default:
        cloneState = {};
    }
    resultArray.push({ ...cloneState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
