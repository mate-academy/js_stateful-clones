'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        copyState = { ...copyState, ...extraData };
        break;

      case 'removeProperties': {
        const nextState = { ...copyState };

        for (const key of keysToRemove) {
          delete nextState[key];
        }
        copyState = nextState;
        break;
      }

      case 'clear':
        copyState = {};
        break;

      default:
        break;
    }

    history.push({ ...copyState });
  }

  return history;
}

module.exports = transformStateWithClones;
