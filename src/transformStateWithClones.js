'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const arrOfActions = [];

  for (const action of actions) {
    stateCopy = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;

      case 'clear':
        for (const key of Object.getOwnPropertyNames(stateCopy)) {
          delete stateCopy[key];
        }

        break;

      default:
        break;
    }

    arrOfActions.push(stateCopy);
  }

  return arrOfActions;
}

module.exports = transformStateWithClones;
