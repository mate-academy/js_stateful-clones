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
    switch (action.type) {
      case 'addProperties':
        Object.assign(changeableObj, action.extraData);
        storyOfActions.push({ ...changeableObj });
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete changeableObj[value];
        }
        storyOfActions.push({ ...changeableObj });
        break;

      case 'clear':
        for (const value in changeableObj) {
          delete changeableObj[value];
        }
        storyOfActions.push({ ...changeableObj });
        break;

      default:
        break;
    }
  }

  return storyOfActions;
}

module.exports = transformStateWithClones;
