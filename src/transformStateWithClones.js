'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const timeObj = { ...state };

  for (const action of actions) {
    const type = action.type;

    if (type === 'addProperties') {
      const extraData = action.extraData;

      for (const key in extraData) {
        timeObj[key] = extraData[key];
      }

      result.push({ ...timeObj });
    }

    if (type === 'removeProperties') {
      const keysToRemove = action.keysToRemove;

      for (const key of keysToRemove) {
        delete timeObj[key];
      }
      result.push({ ...timeObj });
    }

    if (type === 'clear') {
      for (const key in timeObj) {
        delete timeObj[key];
      }
      result.push({ ...timeObj });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
