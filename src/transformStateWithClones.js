'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateVersions = state;
  let variantsCount = 0;

  for (const variants of actions) {
    const { type, extraData, keysToRemove } = variants;

    switch (type) {
      case 'addProperties':
        if (result[variantsCount - 1]) {
          stateVersions = result[variantsCount - 1];
        }

        result.push(Object.assign({}, stateVersions));

        for (const data in extraData) {
          result[variantsCount][data] = extraData[data];
        }
        break;

      case 'removeProperties':
        if (result[variantsCount - 1]) {
          stateVersions = result[variantsCount - 1];
        }

        result.push(Object.assign({}, stateVersions));

        for (const key of keysToRemove) {
          delete result[variantsCount][key];
        }
        break;

      case 'clear':
        result.push({});
        break;
    }

    variantsCount++;
  }

  return result;
}

module.exports = transformStateWithClones;
