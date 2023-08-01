'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyArray = [];
  const copyState = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete copyState[key];
        });
        break;
      case 'clear':
        Object.keys(copyState).forEach((key) => delete copyState[key]);

        break;

      default:
        break;
    }
    copyArray.push({ ...copyState });
  });
  // eslint-disable-next-line

  return copyArray;
}

module.exports = transformStateWithClones;
