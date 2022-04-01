'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  actions.forEach(e => {
    switch (e.type) {
      case 'addProperties': {
        newState = {
          ...newState,
          ...e.extraData,
        };
        result.push({ ...newState });
        break;
      }

      case 'removeProperties': {
        e.keysToRemove.forEach(el => delete newState[el]);
        result.push({ ...newState });
        break;
      }

      case 'clear': {
        newState = {};
        result.push({ ...newState });
        break;
      }

      default: {
        throw new Error(`Unsupported action type: ${actions.type}`);
      }
    }
  });

  return result;
}

module.exports = transformStateWithClones;
