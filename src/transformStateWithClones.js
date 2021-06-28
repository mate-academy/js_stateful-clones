'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };

  const сlones = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(cloneState, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete cloneState[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
    }

    сlones.push({ ...cloneState });
  }

  return сlones;
}
module.exports = transformStateWithClones;
