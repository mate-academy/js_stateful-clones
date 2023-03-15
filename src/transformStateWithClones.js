'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resState = { ...state };
  const resultArr = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(resState, act.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of act.keysToRemove) {
          delete resState[removeKey];
        };
        break;

      case `clear`:
        for (const key in resState) {
          delete resState[key];
        };
        break;

      default:
        break;
    }

    resultArr.push({ ...resState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
