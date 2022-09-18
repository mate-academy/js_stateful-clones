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
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete stateCopy[value];
        };
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw Error('Uknown action type');
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
