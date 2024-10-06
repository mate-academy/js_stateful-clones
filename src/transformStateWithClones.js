'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    const data = actions[i];

    if (data.type === 'addProperties') {
      Object.assign(state, data.extraData);
    }

    if (data.type === 'removeProperties') {
      for (let j = 0; j < data.keysToRemove.length; j++) {
        delete state[data.keysToRemove[j]];
      }
    }

    if (data.type === 'clear') {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    }
    resultArray.push({ ...state });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
