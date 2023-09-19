'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let temporaryPreviousObject = { ...state };

  for (const item of actions) {
    const type = item.type;

    switch (type) {
      case 'addProperties':
        const addPropertiesObj = {
          ...temporaryPreviousObject,
          ...item.extraData,
        };

        temporaryPreviousObject = addPropertiesObj;

        results.push({ ...addPropertiesObj });
        break;
      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete temporaryPreviousObject[key];
        }

        results.push({ ...temporaryPreviousObject });
        break;
      case 'clear':
        temporaryPreviousObject = {};

        results.push({});
        break;
      default:
        continue;
    }
  }

  return results;
}

module.exports = transformStateWithClones;
