/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedState = { ...state };
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
        for (const property in modifiedState) {
          delete modifiedState[property];
        }
        break;
    }

    modifiedActions.push(Object.assign({}, modifiedState));
  }

  return modifiedActions;
}

module.exports = transformStateWithClones;
