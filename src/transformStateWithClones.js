'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(currentState, action.extraData);
        result.push({ ...currentState });
        break;
      }

      case 'removeProperties': {
        action.keysToRemove.forEach((key) => {
          if (key in currentState) {
            delete currentState[key];
          }
        });
        result.push({ ...currentState });
        break;
      }

      case 'clear': {
        for (const key in currentState) {
          delete currentState[key];
        }
        result.push({ ...currentState });
      }
    }
  });

  return result;
}

module.exports = transformStateWithClones;
