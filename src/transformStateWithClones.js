'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = actions;
  let basis = { ...state };

  for (const meaning in actions) {
    const point = actions[meaning];

    for (const keys in point) {
      const intermediate = point[keys];

      if (keys === 'extraData') {
        result[meaning] = {
          ...basis, ...intermediate,
        };
        basis = result[meaning];
      }

      if (keys === 'keysToRemove') {
        result[meaning] = { ...basis };

        for (let i = 0; i < intermediate.length; i++) {
          delete result[meaning][intermediate[i]];
        }
        basis = result[meaning];
      }

      if (point[keys] === 'clear') {
        result[meaning] = {};
        basis = result[meaning];
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
