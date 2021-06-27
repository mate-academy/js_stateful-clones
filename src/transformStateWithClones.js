'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const actionsStory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const removeData of action.keysToRemove) {
          delete newState[removeData];
        };
        break;
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      default:
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }

    actionsStory.push({ ...newState });
  }

  return actionsStory;
}

module.exports = transformStateWithClones;
