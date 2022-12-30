'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const arrayCopy = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete copyState[item];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        break;
    }

    arrayCopy.push({ ...copyState });
  }

  return arrayCopy;
}

module.exports = transformStateWithClones;
