'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = [];
  const clone = { ...state };
  let action = {};
  let removeObject = '';

  for (const ch of actions) {
    action = ch;

    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    for (const remove in action.keysToRemove) {
      removeObject = action.keysToRemove[remove];

      if (action.type === 'removeProperties') {
        delete clone[removeObject];
      }
    }

    for (const key in clone) {
      if (action.type === 'clear') {
        delete clone[key];
      }
    }

    newState.push({ ...clone });
  }

  return newState;
}

module.exports = transformStateWithClones;
