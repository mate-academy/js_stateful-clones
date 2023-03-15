'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const array = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          copyState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    array.push({ ...copyState });
  }

  return array;
}

module.exports = transformStateWithClones;
