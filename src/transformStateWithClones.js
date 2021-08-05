'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const storyOfActions = [];
  const changeableObj = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(changeableObj, extraData);
        break;

      case 'removeProperties':
        for (const value of keysToRemove) {
          delete changeableObj[value];
        }
        break;

      case 'clear':
        for (const value in changeableObj) {
          delete changeableObj[value];
        }
        break;

      default:
        break;
    }
    storyOfActions.push({ ...changeableObj });
  }

  return storyOfActions;
}

module.exports = transformStateWithClones;
