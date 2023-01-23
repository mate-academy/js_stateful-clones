'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let tempSTate = { ...state };

  for (const item of actions) {
    for (const key in item) {
      if (key === 'extraData') {
        Object.assign(tempSTate, item[key]);
        array.push({ ...tempSTate });
      }

      if (key === 'keysToRemove') {
        for (const k in item[key]) {
          delete tempSTate[item[key][k]];
        }
        array.push({ ...tempSTate });
      }

      if (item[key] === 'clear') {
        tempSTate = {};
        array.push({ ...tempSTate });
      }
    }
  }

  return array;
}

module.exports = transformStateWithClones;
