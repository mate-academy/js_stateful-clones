'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopyActions = [];
  let stateCopy = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete stateCopy[prop];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Unknown action type');
    }
    stateCopyActions.push({ ...stateCopy });
  }

  return stateCopyActions;
}

module.exports = transformStateWithClones;
