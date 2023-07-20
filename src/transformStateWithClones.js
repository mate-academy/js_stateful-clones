'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const newArr = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        const stateCopyExtraDate = { ...stateCopy };

        newArr.push(stateCopyExtraDate);
        break;

      case 'removeProperties':
        for (const keyToDelete of action.keysToRemove) {
          delete stateCopy[keyToDelete];
        }

        const stateCopyKeysToRemove = { ...stateCopy };

        newArr.push(stateCopyKeysToRemove);
        break;

      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }

        const stateCopyEmpty = { ...stateCopy };

        newArr.push(stateCopyEmpty);
        break;

      default:
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
