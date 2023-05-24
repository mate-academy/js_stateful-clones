'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = [];

  let stateCopy = {
    ...state,
  };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy, ...extraData,
        };
        break;

      case 'removeProperties':
        stateCopy = {
          ...stateCopy,
        };

        keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    cloneState.push(stateCopy);
  }

  return cloneState;
}

module.exports = transformStateWithClones;
