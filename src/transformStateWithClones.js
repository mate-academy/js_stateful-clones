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
    switch (obj.type) {
      case ('addProperties'):
        Object.assign(copyState, obj.extraData);
        break;

      case ('removeProperties'):
        for (const word of obj.keysToRemove) {
          delete copyState[word];
        }
        break;

      case ('clear'):
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        break;
    }
    resultArr.push({ ...copyState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
