'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  actions.forEach((action) => {
    const stateCopy = stateHistory.length
      ? { ...stateHistory[stateHistory.length - 1] }
      : { ...state };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'clear':
        Object.keys(stateCopy).forEach((key) => delete stateCopy[key]);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;

      default:
        throw new Error('Something went wrong');
    }

    stateHistory.push(stateCopy);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
