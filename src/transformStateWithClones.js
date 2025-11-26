'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  let state = { ...initialState };

  return actions.map((action) => {
    if (action.type === 'clear') {
      state = {};
    } else if (action.type === 'addProperties') {
      state = { ...state, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const remove = new Set(action.keysToRemove);

      state = Object.fromEntries(
        Object.entries(state).filter(([key]) => !remove.has(key)),
      );
    }

    return { ...state };
  });
}

module.exports = transformStateWithClones;
