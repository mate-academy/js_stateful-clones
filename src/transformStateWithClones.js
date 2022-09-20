'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const copyState = { ...state };

  for (const obj of actions) {
    switch (true) {
      case (obj.type === 'addProperties'):
        Object.assign(copyState, obj.extraData);
        resultArr.push({ ...copyState });
        break;

      case (obj.type === 'removeProperties'):
        for (const word of obj.keysToRemove) {
          delete copyState[word];
        }
        resultArr.push({ ...copyState });
        break;

      case (obj.type === 'clear'):
        for (const key in copyState) {
          delete copyState[key];
        }
        resultArr.push({ ...copyState });
        break;

      default:
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
