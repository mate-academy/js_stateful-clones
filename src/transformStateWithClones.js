'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = Object.assign({}, state);
  const historyActions = [];

  const ADD_ACTION = 'addProperties';
  const DELETE_ACTION = 'removeProperties';
  const CLEAR_ACTION = 'clear';

  for (const action of actions) {
    const whatWeMustDo = action.type;

    switch (whatWeMustDo) {
      case (ADD_ACTION):
        Object.assign(copyState, action.extraData);
        break;

      case (DELETE_ACTION):
        deletProp(copyState, action.keysToRemove);
        break;

      case (CLEAR_ACTION):
        clearingTheObject(copyState);
        break;

      default:
        throw new Error(`Unknown key: "${whatWeMustDo}"`);
    }

    historyActions.push(Object.assign({}, copyState));
  }

  return historyActions;
}

function clearingTheObject(object) {
  for (const key in object) {
    delete object[key];
  }

  return object;
}

function deletProp(object, props) {
  for (const prop of props) {
    delete object[prop];
  }

  return object;
}

module.exports = transformStateWithClones;
