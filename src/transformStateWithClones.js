'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let correctState = Object.assign({}, state);

  for (const action of actions) {
    // let correctState = Object.assign({}, state);
    // console.log(correctState);
    switch (action['type']) {
      case 'addProperties':
        correctState = Object.assign(correctState, action['extraData']);

        const cloneAdd = Object.assign({}, correctState);

        result.push(cloneAdd);
        break;

      case 'removeProperties':
        for (const keys of action['keysToRemove']) {
          delete correctState[keys];
        }

        const cloneRemove = Object.assign({}, correctState);

        result.push(cloneRemove);
        break;

      case 'clear':
        for (const keys in correctState) {
          delete correctState[keys];
        }

        const clone = Object.assign({}, correctState);

        result.push(clone);
        continue;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
