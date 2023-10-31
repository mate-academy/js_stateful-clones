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
    switch (action.type) {
      case 'addProperties':
        Object.assign(COPY_OF_STATE, action.extraData);
        break;

      case 'removeProperties':
        const removeValue = action.keysToRemove;

        for (const key of Object.keys(COPY_OF_STATE)) {
          if (removeValue.includes(key)) {
            delete COPY_OF_STATE[key];
          }
        }
        break;

      case 'clear':
        for (const value of Object.keys(COPY_OF_STATE)) {
          delete COPY_OF_STATE[value];
        }
        break;
    }

    ARRAY_OF_STATES.push({ ...COPY_OF_STATE });
  }

  return ARRAY_OF_STATES;
}

module.exports = transformStateWithClones;
