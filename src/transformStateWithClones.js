'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrWithStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        arrWithStates.push(newState);
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        arrWithStates.push(newState);
        break;

      case 'clear':
        newState = {};
        arrWithStates.push(newState);
    }
  }

  return arrWithStates;
}

module.exports = transformStateWithClones;
