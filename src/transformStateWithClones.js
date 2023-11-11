'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  actions.reduce((acc, action) => {
    const { type, extraData, keysToRemove } = action;
    let newState = { ...acc };

    switch (type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    states.push({ ...newState });

    return newState;
  }, state);

  return states;
}

module.exports = transformStateWithClones;
