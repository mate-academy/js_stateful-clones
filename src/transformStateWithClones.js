'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrayOfActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const clearKey in stateCopy) {
          delete stateCopy[clearKey];
        };
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete stateCopy[removeKey];
        };
        break;

      default:
        break;
    };

    arrayOfActions.push({ ...stateCopy });
  };

  return arrayOfActions;
};

module.exports = transformStateWithClones;
