'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArr = [stateCopy];

  for (const action of actions) {
    let currentState = { ...stateArr[stateArr.length - 1] };

    switch (action.type) {
      case 'addProperties' :
        currentState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear' :
        currentState = {};
        break;

      default: {
        break;
      }
    }

    stateArr.push(currentState);
  }

  stateArr.shift();

  return stateArr;
}

module.exports = transformStateWithClones;
