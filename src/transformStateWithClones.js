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
      case 'clear':
        for (const property in statePaste) {
          delete statePaste[property];
        }
        break;
      default:
        throw new Error('Error');
    }
    objState.push({ ...statePaste });
  }

  return objState;
}

module.exports = transformStateWithClones;
