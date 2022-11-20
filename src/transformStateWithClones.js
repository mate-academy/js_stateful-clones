'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  const arr = actions.map((el) => {
    switch (el.type) {
      case 'addProperties':
        Object.assign(stateCopy, el.extraData);

        return { ...stateCopy };

      case 'removeProperties':
        for (const key of el.keysToRemove) {
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

  return arr;
}

module.exports = transformStateWithClones;
