'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let actionToSave = {};
  const stateActionsArray = [];

  if (Object.keys(state).length !== 0) {
    Object.assign(actionToSave, state);
  }

  for (const action of actions) {
    for (const value of Object.values(action)) {
      switch (value) {
        case 'addProperties': {
          Object.assign(actionToSave, action.extraData);
          stateActionsArray.push(Object.assign({}, actionToSave));

          break;
        }

        case 'removeProperties': {
          for (const key of action.keysToRemove) {
            delete actionToSave[key];
          }
          stateActionsArray.push(Object.assign({}, actionToSave));

          break;
        }

        case 'clear': {
          stateActionsArray.push({});
          actionToSave = {};

          break;
        }
      }
    }
  }

  if (stateActionsArray.length === 0) {
    stateActionsArray.push({});
  }

  return stateActionsArray;
}

module.exports = transformStateWithClones;
