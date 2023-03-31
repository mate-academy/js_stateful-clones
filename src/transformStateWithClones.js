'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateUpdated = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    const actionType = actions[i];
    const type = actionType.type;

    switch (type) {
      case 'clear':
        stateUpdated = {};
        break;

      case 'addProperties':
        const extraData = actionType.extraData;

        Object.assign(stateUpdated, extraData);
        break;

      case 'removeProperties':
        const keysToRemove = actionType.keysToRemove;

        keysToRemove.forEach(key => delete stateUpdated[key]);
        break;

      default:
        throw new Error('Wrong input!');
    }

    stateHistory.push(Object.assign({}, stateUpdated));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
