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
        result.push({ ...prevState });
        break;
      case 'removeProperties':
        loopRemove(val.keysToRemove, prevState);
        result.push({ ...prevState });
        break;
      case 'clear':
        loopRemove(Object.keys(prevState), prevState);
        result.push({ ...prevState });
        break;
      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
