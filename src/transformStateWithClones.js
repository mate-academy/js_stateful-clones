'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clones = { ...state };

  for (const action of actions) {
    clones = { ...clones };

    if (action.type === 'addProperties') {
      Object.assign(clones, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clones[key];
      }
    }

    if (action.type === 'clear') {
      Object.keys(clones).forEach((key) => delete clones[key]);
    }

    result.push(clones);
  }

  return result;
}

module.exports = transformStateWithClones;
