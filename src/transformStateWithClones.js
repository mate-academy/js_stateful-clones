'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        result.push({ ...stateCopy });

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        result.push({ ...stateCopy });

        break;

      case 'clear':
        stateCopy = {};
        result.push({ ...stateCopy });

        break;

      default:
        return 'Actions aren\'t correct.';
    }
  }

  return result;
}

module.exports = transformStateWithClones;
