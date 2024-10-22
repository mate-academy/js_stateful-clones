'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        addProperties(clone, action.extraData, result);
        break;

      case 'removeProperties':
        removeProperties(clone, action.keysToRemove, result);
        break;

      case 'clear':
        clear(clone, result);
        break;

      default:
        break;
    }
  }

  return result;
}

const addProperties = (state, extraData, result) => {
  Object.assign(state, extraData);
  result.push({ ...state });
};

const removeProperties = (state, keysToRemove, result) => {
  for (const key of keysToRemove) {
    delete state[key];
  }
  result.push({ ...state });
};

const clear = (state, result) => {
  for (const key in state) {
    delete state[key];
  }
  result.push({ ...state });
};

module.exports = transformStateWithClones;
