'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];

  const currentState = {
    ...state,
  };

  actions.forEach((action, index) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach(key => delete currentState[key]);
        break;
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
      default:
        break;
    }

    stateClones.push({
      ...currentState,
    });
  });

  return stateClones;
}

module.exports = transformStateWithClones;
