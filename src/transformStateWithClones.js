'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties' :
        for (const property of keysToRemove) {
          delete copyState[property];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      default:
        return ('Error action');
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
