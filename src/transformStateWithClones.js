'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  const stateCopy = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case 'clear':
        Object.keys(stateCopy).forEach(key => {
          delete stateCopy[key];
        });
        break;

      default:
        return new Error('Something went wrong');
    }

    stateClones.push({ ...stateCopy });
  });

  return stateClones;
}

module.exports = transformStateWithClones;
