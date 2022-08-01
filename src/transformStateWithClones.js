'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const ActionsStory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete cloneState[removeKey];
        }
        break;

      case 'clear':
        for (const clearKey in cloneState) {
          delete cloneState[clearKey];
        }
        break;
    }

    ActionsStory.push({ ...cloneState });
  }

  return ActionsStory;
}

module.exports = transformStateWithClones;
