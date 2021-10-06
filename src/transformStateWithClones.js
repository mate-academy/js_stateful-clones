'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = {
    ...state,
  };
  const result = [];

  for (const count in actions) {
    const { type, extraData, keysToRemove } = actions[count];

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return 'Error: no actions received';
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
