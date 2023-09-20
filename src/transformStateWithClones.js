'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [state];
  let newState = state;
  const addType = 'addProperties';
  const removeType = 'removeProperties';
  const clearType = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case addType: {
        newState = { ...newState, ...extraData };
        break;
      }

      case removeType: {
        newState = { ...newState };

        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;
      }

      case clearType: {
        newState = {};
        break;
      }

      default: {
        throw new Error(`Невідомий тип дії: ${type}`);
      }
    }

    newStates.push(newState);
  }

  return newStates.slice(1);
}

module.exports = transformStateWithClones;
