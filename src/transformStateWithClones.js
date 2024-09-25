'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const addProperties = (state, properties, res) => {
  Object.assign(state, properties);
  res.push({ ...state });
};

const removeProperty = (state, keysToRemove, res = []) => {
  keysToRemove.forEach((key) => {
    delete state[key];
  });
  res.push({ ...state });
};

const clearState = (state, res) => {
  Object.keys(state).forEach((key) => delete state[key]);

  res.push({ ...state });
};

function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const res = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        return addProperties(newState, action.extraData, res);

      case 'removeProperties':
        return removeProperty(newState, action.keysToRemove, res);

      default:
        return clearState(newState, res);
    }
  });

  return res;
}

module.exports = transformStateWithClones;
