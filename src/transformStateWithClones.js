'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const data in extraData) {
          copyState[data] = extraData[data];
        }

        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete copyState[keyToRemove];
        }

        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }

        break;
    }

    const copyTwoState = { ...copyState };

    result.push(copyTwoState);
  }

  return result;
}

module.exports = transformStateWithClones;
