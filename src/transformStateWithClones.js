'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const copyState = { ...state };

  for (const middleActions of actions) {
    switch (middleActions.type) {
      case 'addProperties':
        Object.assign(copyState, middleActions.extraData);
        break;

      case 'removeProperties':
        for (const elem of middleActions.keysToRemove) {
          delete copyState[elem];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    arr.push({ ...copyState });
  }

  return arr;
}

module.exports = transformStateWithClones;
