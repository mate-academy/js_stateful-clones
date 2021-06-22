'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    const cloneObj = (result.length !== 0) ? {
      ...result[result.length - 1],
    } : {
      ...state,
    };

    if (Object.is(type, 'addProperties')) {
      const addedProperties = {};

      for (const key in extraData) {
        if (key in state) {
          continue;
        }
        addedProperties[key] = extraData[key];
      }

      result.push({
        ...cloneObj,
        ...extraData,
      });
    }

    if (Object.is(type, 'removeProperties')) {
      for (const key of keysToRemove) {
        delete cloneObj[key];
      }
      result.push({ ...cloneObj });
    }

    if (Object.is(type, 'clear')) {
      result.push({});
    }
  }

  return result;
};

module.exports = transformStateWithClones;
