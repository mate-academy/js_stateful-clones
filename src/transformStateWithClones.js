'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const transformState = [];
  const setState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(setState, extraData);

        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => delete setState[key]);

        break;

      case 'clear':
        Object.keys(setState).forEach((key) => delete setState[key]);

        break;

      default:
        throw new Error('Invalid action type');
    }

    transformState.push({ ...setState });
  }

  return transformState;
}

module.exports = transformStateWithClones;
