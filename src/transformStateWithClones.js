'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = [];

  let copyState = {
    ...state,
  };

  const addAction = 'addProperties';
  const removeAction = 'removeProperties';
  const clearAction = 'clear';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case addAction:
        copyState = {
          ...copyState, ...extraData,
        };
        break;

      case removeAction:
        copyState = {
          ...copyState,
        };

        keysToRemove.forEach(key => {
          delete copyState[key];
        });
        break;

      case clearAction:
        copyState = {};
        break;

      default:
        break;
    }

    cloneState.push(copyState);
  }

  return cloneState;
}

module.exports = transformStateWithClones;
