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

  const addAction = 'addProperties';
  const removeAction = 'removeProperties';
  const clearAction = 'clear';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case addAction:
        stateCopy = {
          ...stateCopy, ...extraData,
        };
        break;

      case removeAction:
        stateCopy = {
          ...stateCopy,
        };

        keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case clearAction:
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
