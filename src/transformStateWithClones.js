'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedArray = [];
  let currentState = { ...state };

  actions.map((action) => {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties' && extraData) {
      Object.assign(currentState, extraData);
    }

    if (type === 'removeProperties' && Array.isArray(keysToRemove)) {
      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key]) => !keysToRemove.includes(key),
        ),
      );
    }

    if (type === 'clear') {
      currentState = {};
    }

    transformedArray.push(structuredClone(currentState));
  });

  return transformedArray;
}

module.exports = transformStateWithClones;
