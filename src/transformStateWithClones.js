'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statePaste = { ...state };
  const objState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(statePaste, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete statePaste[key];
        }
        break;

      default:
        for (const property in statePaste) {
          delete statePaste[property];
        }
    }
    objState.push({ ...statePaste });
  }

  return objState;
}

module.exports = transformStateWithClones;
