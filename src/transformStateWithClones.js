'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  const states = actions.map((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        return { ...stateCopy };

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }

        return { ...stateCopy };

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        return { ...stateCopy };

      default:
        break;
    }
  });

  return states;
}

module.exports = transformStateWithClones;
