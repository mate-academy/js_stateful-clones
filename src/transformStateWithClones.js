'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const COPY_OF_STATE = { ...state };
  const ARRAY_OF_STATES = [];

  for (const action of actions) {
    for (const key in action) {
      if (action[key] === 'addProperties') {
        Object.assign(COPY_OF_STATE, action.extraData);
        ARRAY_OF_STATES.push({ ...COPY_OF_STATE });
      }

      if (action[key] === 'removeProperties') {
        const removeValue = action.keysToRemove;

        for (const part of Object.keys(COPY_OF_STATE)) {
          if (removeValue.includes(part)) {
            delete COPY_OF_STATE[part];
          }
        }
        ARRAY_OF_STATES.push({ ...COPY_OF_STATE });
      }

      if (action.type === 'clear') {
        for (const value of Object.keys(COPY_OF_STATE)) {
          delete COPY_OF_STATE[value];
        }
        ARRAY_OF_STATES.push({});
      }
    }
  };

  return ARRAY_OF_STATES;
}

module.exports = transformStateWithClones;
