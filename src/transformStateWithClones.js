'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const stateCopy = {
    ...state,
  };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        return 'Error, Wrong action provided';
    }

    states.push({
      ...stateCopy,
    });
  });

  return states;
}

module.exports = transformStateWithClones;
