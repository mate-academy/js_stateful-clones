'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let stateCopy = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy, ...action.extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;

      case 'clear':
        Object.keys(stateCopy).forEach((key) => {
          delete stateCopy[key];
        });
        break;

      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    states.push({ ...stateCopy });
  });

  return states;
}

module.exports = transformStateWithClones;
