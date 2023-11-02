'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const transformedStates = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        const { extraData } = action;

        stateCopy = {
          ...stateCopy,
          ...extraData,
        };
        break;
      case 'removeProperties':
        const { keysToRemove } = action;

        stateCopy = { ...stateCopy };

        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        break;
    }

    transformedStates.push(stateCopy);
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
