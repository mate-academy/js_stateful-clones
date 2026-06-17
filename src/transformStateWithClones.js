'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let previousState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const nextStateObj = {};

    switch (type) {
      case 'addProperties': {
        Object.assign(nextStateObj, previousState, extraData);
        break;
      }

      case 'removeProperties': {
        Object.assign(nextStateObj, previousState);

        for (const key of keysToRemove) {
          delete nextStateObj[key];
        }
        break;
      }
      case 'clear':
        break;

      default:
        throw new Error('unsupported type of action');
    }
    states.push(nextStateObj);
    previousState = states[states.length - 1];
  }

  return states;
}

module.exports = transformStateWithClones;
