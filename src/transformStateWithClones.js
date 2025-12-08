'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyState = { ...state };
  let updatedState;

  for (let i = 0; i < actions.length; i++) {
    const object = actions[i];
    const { type, ...data } = object;

    switch (type) {
      case 'addProperties':
        updatedState = { ...copyState, ...data.extraData };
        break;

      case 'removeProperties':
        updatedState = { ...copyState };

        for (const key of data.keysToRemove) {
          delete updatedState[key];
        }
        break;

      case 'clear':
        updatedState = {};
        break;

      default:
        throw new Error('Error');
    }

    result.push({ ...updatedState });
    copyState = updatedState;
  }

  return result;
}

module.exports = transformStateWithClones;
