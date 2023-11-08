'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateClones = [];
  const recentState = { ...state };
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(recentState, action.extraData);
        break;

      case REMOVE_PROPERTIES:
        action.keysToRemove.forEach(key => {
          delete recentState[key];
        });
        break;

      case CLEAR:
        for (const key in recentState) {
          delete recentState[key];
        }
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('Wrong action type');
    }

    stateClones.push({ ...recentState });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
