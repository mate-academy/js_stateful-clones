'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyStates = { ...state };
  const arrayStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyStates, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyStates[key];
        }
        break;

      case 'clear':
        copyStates = {};
        break;
      default:
        return 'Wrong type of data!';
    }

    arrayStates.push({ ...copyStates });
  }

  return arrayStates;
}

module.exports = transformStateWithClones;
