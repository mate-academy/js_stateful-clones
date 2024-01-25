/* eslint-disable no-console */
/* eslint-disable no-shadow */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const stateVersions = [];

  actions.reduce((currentState, action) => {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = {
          ...currentState, ...action.extraData,
        };
        break;
      case 'removeProperties':
        nextState = { ...currentState };

        action.keysToRemove.forEach(key => {
          delete nextState[key];
        });
        break;
      case 'clear':
        nextState = {};
        break;
      default:
        return currentState;
    }
    stateVersions.push(nextState);

    return nextState;
  }, initialState);

  return stateVersions;
}

module.exports = transformStateWithClones;
