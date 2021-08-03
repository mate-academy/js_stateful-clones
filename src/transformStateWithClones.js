'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const wokrObject = { ...state };
  const storyChange = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(wokrObject, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const value of actions[i].keysToRemove) {
        delete wokrObject[value];
      }
    }

    if (actions[i].type === 'clear') {
      for (const removeKey in wokrObject) {
        delete wokrObject[removeKey];
      }
    }

    storyChange[i] = { ...wokrObject };
  }

  return storyChange;
}

module.exports = transformStateWithClones;
