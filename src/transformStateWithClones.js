'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateClon = { ...state };
  const STATE_STEPS_ARR = [];

  for (const action of actions) {
    switch (action.type) {
      case `addProperties`: {
        for (const key in action.extraData) {
          stateClon[key] = action.extraData[key];
        }

        STATE_STEPS_ARR.push({ ...stateClon });
        break;
      }

      case `removeProperties`: {
        for (const key of action.keysToRemove) {
          delete stateClon[key];
        }

        STATE_STEPS_ARR.push({ ...stateClon });
        break;
      }

      case `clear`: {
        stateClon = {};
        STATE_STEPS_ARR.push({ ...stateClon });
        break;
      }

      default: {
        break;
      }
    }
  }

  return STATE_STEPS_ARR;
}

module.exports = transformStateWithClones;
