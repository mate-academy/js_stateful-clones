'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let copyState = { ...state };

  for (const action of actions) {
    copyState = { ...copyState };

    switch (action.type) {
      case 'addProperties': {
        copyState = Object.assign(copyState, action.extraData);

        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }

        break;
      }

      case 'clear': {
        copyState = {};

        break;
      }
    }

    arr.push({ ...copyState });
  }

  return arr;
}

module.exports = transformStateWithClones;
