'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = Object.assign({}, currentState);

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        continue;
    }

    statesArray.push({ ...currentState });
  }

  // for (const action of actions) {
  //   if (action.type === 'addProperties') {
  //     currentState = Object.assign({}, currentState, action.extraData);
  //   }

  //   if (action.type === 'removeProperties') {
  //     currentState = Object.assign({}, currentState);

  //     for (const key of action.keysToRemove) {
  //       delete currentState[key];
  //     }
  //   }

  //   if (action.type === 'clear') {
  //     currentState = Object.assign({}, currentState);

  //     for (const item in currentState) {
  //       delete currentState[item];
  //     }
  //   }

  //   statesArray.push({ ...currentState });
  // }

  return statesArray;
}

module.exports = transformStateWithClones;
