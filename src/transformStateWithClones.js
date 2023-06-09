'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const newState = [];

  actions.map(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, { ...action.extraData });
        break;
      case 'removeProperties':
        action.keysToRemove.map(key => delete stateCopy[key]);
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error('Invalid action type');
    }

    newState.push({ ...stateCopy });
  });

  return newState;
}

module.exports = transformStateWithClones;
