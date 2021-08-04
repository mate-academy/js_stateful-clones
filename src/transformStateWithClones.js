/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let modifiedState = { ...state };
  const modifiedActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(modifiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete modifiedState[key];
        }
        break;

      case 'clear':
        modifiedState = {};
        break;
    }

    modifiedActions.push({ ...modifiedState });
  }

  return modifiedActions;
}

module.exports = transformStateWithClones;
