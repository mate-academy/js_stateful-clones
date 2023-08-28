'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithcloneStates(state, actions) {
  const resultTransformState = [];
  let cloneState = { ...state };
  const addProperExtraData = 'addProperties';
  const removePropertyKeys = 'removeProperties';
  const doEmptyState = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case addProperExtraData: {
        cloneState = {
          ...cloneState, ...extraData,
        };
        break;
      }

      case removePropertyKeys: {
        for (const key of keysToRemove) {
          delete cloneState[key];
        }
        break;
      }

      case doEmptyState: {
        cloneState = {};
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${type}`);
      }
    }

    resultTransformState.push({ ...cloneState });
  }

  return resultTransformState;
}

module.exports = transformStateWithcloneStates;
