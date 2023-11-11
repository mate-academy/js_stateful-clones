'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_HISTORY = [];

  let currentState = { ...state };

  actions.forEach((element) => {
    switch (element.type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...element.extraData,
        };
        break;
      case 'removeProperties':
        element.keysToRemove.forEach(key => delete currentState[key]);
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('ERROR');
    }

    STATE_HISTORY.push({ ...currentState });
  });

  return STATE_HISTORY;
}

module.exports = transformStateWithClones;
