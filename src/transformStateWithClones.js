'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = JSON.parse(JSON.stringify(state));
  const newStateArr = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        Object.keys(newState).forEach((element) => delete newState[element]);
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((element) => delete newState[element]);
        break;

      default:
        throw new Error('Unexpected error');
    }
    newStateArr.push({ ...newState });
  });

  return newStateArr;
}

module.exports = transformStateWithClones;
