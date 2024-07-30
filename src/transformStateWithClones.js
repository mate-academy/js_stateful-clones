'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];

  let copyState = { ...state };

  for (const action of actions) {
    const { type, ...param } = action;
    const lastState = { ...copyState };

    switch (type) {
      case 'clear':
        stateArray.push({});
        break;

      case 'removeProperties':
        for (const delKey of param.keysToRemove) {
          if (lastState[delKey]) {
            delete lastState[delKey];
          }
        }

        stateArray.push({ ...lastState });
        break;

      case 'addProperties':
        for (const key in param.extraData) {
          lastState[key] = param.extraData[key];
        }

        stateArray.push({ ...lastState });
        break;
    }

    if (stateArray.length) {
      copyState = { ...stateArray[stateArray.length - 1] };
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
