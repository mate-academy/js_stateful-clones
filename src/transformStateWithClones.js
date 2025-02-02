'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateInAction = { ...state };
  const response = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateInAction = { ...stateInAction, ...action.extraData };
        break;

      case 'removeProperties':
        stateInAction = { ...stateInAction };

        action.keysToRemove.map(
          (keyToRemove) => delete stateInAction[keyToRemove],
        );
        break;

      default:
        stateInAction = {};
        break;
    }

    response.push(stateInAction);
  }

  return response;
}

module.exports = transformStateWithClones;
