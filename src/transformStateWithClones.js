'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    const {
      type,
      extraData = {},
      keysToRemove = [],
    } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(stateClone, extraData);

        break;
      }

      case 'removeProperties': {
        keysToRemove.forEach((key) => {
          delete stateClone[key];
        });

        break;
      }

      case 'clear': {
        stateClone = {};

        break;
      }

      default: {
        throw new Error('Unexpected action type');
      }
    }

    statesHistory.push({ ...stateClone });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
