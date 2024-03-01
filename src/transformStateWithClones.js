'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArr = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete newState[item];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }

    resultArr.push(newState);
    currentState = newState;
  }

  return resultArr;
}

module.exports = transformStateWithClones;
