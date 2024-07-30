'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objArr = [];
  const newState = { ...state };

  for (const a of actions) {
    switch (a.type) {
      case 'addProperties':
        Object.assign(newState, a.extraData);
        objArr.push({ ...newState });
        break;

      case 'removeProperties':
        for (const k of a.keysToRemove) {
          delete newState[k];
        }
        objArr.push({ ...newState });
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        objArr.push({});
        break;
    }
  }

  return objArr;
}

module.exports = transformStateWithClones;
