'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const typeOfAction = action.type;

    switch (typeOfAction) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};

        break;
      default:
        throw Error('Something went wrong');
    }
    result.push(stateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
