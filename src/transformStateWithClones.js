'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const arrayForm = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(stateClone, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete stateClone[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    arrayForm.push({ ...stateClone });
  }

  return arrayForm;
}

module.exports = transformStateWithClones;
