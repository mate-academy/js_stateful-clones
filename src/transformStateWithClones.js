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

        results.push(addPropertiesObj);
        break;
      case 'removeProperties':
        const removePropertiesObj = { ...temporaryPreviousObject };

        for (const key of item.keysToRemove) {
          delete removePropertiesObj[key];
        }

        temporaryPreviousObject = removePropertiesObj;

        results.push(removePropertiesObj);
        break;
      default:
        temporaryPreviousObject = {};

        results.push({});
    }
  }

  return results;
}

module.exports = transformStateWithClones;
