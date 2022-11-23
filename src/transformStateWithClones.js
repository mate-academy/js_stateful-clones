'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  const states = actions.map((element) => {
    switch (element.type) {
      case 'addProperties':
        Object.assign(stateCopy, element.extraData);

        return { ...stateCopy };

      case 'removeProperties':
        for (const key of element.keysToRemove) {
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
