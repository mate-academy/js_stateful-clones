'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const step = { ...state };
  const copyStep = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(step, { ...action.extraData });
      copyStep.push({ ...step });
    }

    if (action.type === 'removeProperties') {
      const bro = action.keysToRemove;

      for (const n of bro) {
        delete step[n];
      }
      copyStep.push({ ...step });
    }

    if (action.type === 'clear') {
      for (const ch in step) {
        delete step[ch];
      }
      copyStep.push({ ...step });
    }
  }

  return copyStep;
}

module.exports = transformStateWithClones;
