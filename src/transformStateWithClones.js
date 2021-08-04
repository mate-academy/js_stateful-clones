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
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateClone, actions[i].extraData);

        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete stateClone[key];
        }

        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;

      default:
        break;
    }

    arrayForm.push({ ...stateClone });
  }

  return arrayForm;
}

module.exports = transformStateWithClones;
