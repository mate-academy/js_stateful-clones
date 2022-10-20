'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrayState = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case action.type === 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete stateCopy[prop];
        }
        break;

      case action.type === 'clear':
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        }
        break;

      default:
        return 'Enter valid data';
    }

    arrayState.push({ ...stateCopy });
  }

  return arrayState;
}

module.exports = transformStateWithClones;
