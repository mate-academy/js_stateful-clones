'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let copyState = { ...state };

  for (const k of actions) {
    switch (k.type) {
      case 'addProperties':
        copyState = {
          ...copyState,
          ...k.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of k.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        break;
    }

    states.push({ ...copyState });
  }

  return states;
}

module.exports = transformStateWithClones;
