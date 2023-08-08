'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyOfActions = [];
  let temporaryState = { ...state };

  for (const action of actions) {
    const actionType = action.type;
    const actionExtraData = action.extraData;
    const actionKeysToRemove = action.keysToRemove;

    if (actionType === 'addProperties') {
      temporaryState = {
        ...temporaryState, ...actionExtraData,
      };
      historyOfActions.push({ ...temporaryState });
    }

    if (actionType === 'removeProperties') {
      for (const property of actionKeysToRemove) {
        delete temporaryState[property];
      }
      historyOfActions.push({ ...temporaryState });
    }

    if (actionType === 'clear') {
      temporaryState = {};
      historyOfActions.push({ ...temporaryState });
    }
  }

  return historyOfActions;
}

module.exports = transformStateWithClones;
