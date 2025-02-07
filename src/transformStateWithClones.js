'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const transformState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        action.keysToRemove.map((keyToRemove) => delete stateCopy[keyToRemove]);
        break;

      default:
        stateCopy = {};
        break;
    }

    transformState.push(stateCopy);
  }

  return transformState;
}

module.exports = transformStateWithClones;
