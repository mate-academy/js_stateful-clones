'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        const previousArrayState = { ...(newStates.at(-1) ?? state) };

        newStates.push({ ...previousArrayState, ...action.extraData });
        break;
      case 'removeProperties':
        const previousState = { ...(newStates.at(-1) ?? state) };

        action.keysToRemove.forEach((key) => {
          delete previousState[key];
        });
        newStates.push({ ...previousState });
        break;
      case 'clear':
        newStates.push({});
        break;
      default:
        newStates.push({ ...state });
        break;
    }
  });

  return newStates;
}

module.exports = transformStateWithClones;
