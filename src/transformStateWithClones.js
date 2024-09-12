'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let referenceState = { ...state };

  for (const action of actions) {
    const stateCopy = { ...referenceState };
    const { type } = action;

    switch (type) {
      case 'addProperties': {
        const { extraData } = action;

        for (const [key, value] of Object.entries(extraData)) {
          stateCopy[key] = value;
        }

        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete stateCopy[key];
        }

        break;
      }

      case 'clear': {
        Object.keys(stateCopy).forEach((key) => {
          delete stateCopy[key];
        });

        break;
      }
    }

    stateHistory.push(stateCopy);
    referenceState = { ...stateCopy };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
