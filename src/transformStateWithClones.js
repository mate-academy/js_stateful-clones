'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneArray = [];
  const copyState = { ...state };

  for (const clone of actions) {
    switch (clone.type) {
      case 'addProperties':
        Object.assign(copyState, clone.extraData);
        break;

      case 'removeProperties':
        for (const key of clone.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        };
        break;
    }

    cloneArray.push(Object.assign({}, copyState));
  }

  return cloneArray;
}

module.exports = transformStateWithClones;
