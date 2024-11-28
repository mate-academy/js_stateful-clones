'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const loopRemove = (obj, state) => {
  for (const key of obj) {
    delete state[key];
  }
};

function transformStateWithClones(state, actions) {
  const result = [];
  const prevState = { ...state };

  for (const val of actions) {
    switch (val.type) {
      case 'addProperties':
        Object.assign(prevState, val.extraData);
        break;
      case 'removeProperties':
        loopRemove(val.keysToRemove, prevState);
        break;
      case 'clear':
        loopRemove(Object.keys(prevState), prevState);
        break;
      default:
        break;
    }
    result.push({ ...prevState });
  }

  return result;
}

module.exports = transformStateWithClones;
