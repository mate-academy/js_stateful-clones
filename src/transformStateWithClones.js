'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const obj = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(obj, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete obj[key]);
    } else if (action.type === 'clear') {
      Object.keys(obj).forEach((key) => delete obj[key]);
    }

    states.push({ ...obj });
  }

  return states;
}

module.exports = transformStateWithClones;
