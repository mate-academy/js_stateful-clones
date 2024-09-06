'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateClone = { ...state };
  const array = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        stateClone = {};
        break;

      case 'addProperties':
        stateClone = { ...stateClone, ...action.extraData };
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };

        action.keysToRemove.forEach((key) => {
          delete stateClone[key];
        });

        break;

      default:
        throw new Error('Error');
    }

    array.push({ ...stateClone });
  });

  return array;
}

module.exports = transformStateWithClones;
