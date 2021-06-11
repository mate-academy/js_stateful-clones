'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newObj = { ...state };

  for (let i = 0; i !== actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(newObj, actions[i].extraData);
      actions[i] = { ...newObj };
      continue;
    }

    if (actions[i].type === 'removeProperties') {
      for (const k of actions[i].keysToRemove) {
        delete newObj[k];
      }
      actions[i] = { ...newObj };
      continue;
    }

    for (const key in newObj) {
      delete newObj[key];
    }
    actions[i] = { ...newObj };
  }

  return actions;
}

module.exports = transformStateWithClones;
