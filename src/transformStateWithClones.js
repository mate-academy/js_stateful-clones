'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let correctState = Object.assign({}, state);

  const result = [];

  for (const action of actions) {
    if (action['type'] === 'addProperties') {
      correctState = Object.assign(correctState, action['extraData']);

      const clone = Object.assign({}, correctState);

      result.push(clone);
    }

    if (action['type'] === 'removeProperties') {
      for (const keys of action['keysToRemove']) {
        delete correctState[keys];
      }

      const clone = Object.assign({}, correctState);

      result.push(clone);
    }

    if (action['type'] === 'clear') {
      for (const keys in correctState) {
        delete correctState[keys];
      }

      const clone = Object.assign({}, correctState);

      result.push(clone);
    }
  }

  // console.log(state);
  return result;
}

module.exports = transformStateWithClones;
