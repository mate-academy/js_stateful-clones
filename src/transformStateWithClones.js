'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const updatedStates = [];

  actions.forEach(({ type, extraData = {}, keysToRemove = [] }) => {
    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        currentState = Object.fromEntries(
          Object.entries(currentState).filter(
            ([key]) => !keysToRemove.includes(key),
          ),
        );
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    if (['addProperties', 'removeProperties', 'clear'].includes(type)) {
      updatedStates.push({ ...currentState });
    }
  });

  return updatedStates;
}

module.exports = transformStateWithClones;
