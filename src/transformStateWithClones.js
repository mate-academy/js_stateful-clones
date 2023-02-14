'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [
    { ...state },
  ];

  for (const action of actions) {
    const tempState = {
      ...result[result.length - 1],
    };

    const { type, extraData, keysToRemove } = action;

    switch (true) {
      case type === 'addProperties':
        Object.assign(tempState, extraData);
        break;

      case type === 'clear':
        for (const key in tempState) {
          delete tempState[key];
        }
        break;

      case type === 'removeProperties':
        for (const key of keysToRemove) {
          delete tempState[key];
        }
        break;
    }
    result.push(tempState);
  }

  result.shift();

  return result;
}

module.exports = transformStateWithClones;
