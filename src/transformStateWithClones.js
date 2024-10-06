'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changedObj = structuredClone(state);
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    const data = actions[i];

    if (data.type === 'addProperties') {
      Object.assign(changedObj, data.extraData);
    }

    if (data.type === 'removeProperties') {
      for (let j = 0; j < data.keysToRemove.length; j++) {
        delete changedObj[data.keysToRemove[j]];
      }
    }

    if (data.type === 'clear') {
      Object.keys(changedObj).forEach((key) => {
        delete changedObj[key];
      });
    }
    resultArray.push({ ...changedObj });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
