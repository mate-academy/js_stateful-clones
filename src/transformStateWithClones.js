'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATES = [];
  let copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        copyState = { ...copyState, ...extraData };
        break;

      case 'removeProperties':
        copyState = { ...copyState };

        for (const key of keysToRemove) {
          delete copyState[key];
        }
        break;

      default:
        break;
    }

    STATES.push(copyState);
  }

  return STATES;
}

module.exports = transformStateWithClones;
