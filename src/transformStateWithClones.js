'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const res = [];

  for (const step of actions) {
    const copy = { ...currentState };

    if (step.type === 'addProperties') {
      for (const key in step.extraData) {
        copy[key] = step.extraData[key];
      }
    }

    if (step.type === 'removeProperties') {
      for (const key of step.keysToRemove) {
        delete copy[key];
      }
    }

    if (step.type === 'clear') {
      Object.keys(copy).forEach((key) => delete copy[key]);
    }

    res.push({ ...copy });
    currentState = copy;
  }

  return res;
}

module.exports = transformStateWithClones;
