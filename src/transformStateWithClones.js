'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let stateCopy = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
    }

    history.push({ ...stateCopy });
  });

  return history;
}
module.exports = transformStateWithClones;
