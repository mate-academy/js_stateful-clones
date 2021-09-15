'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResult = [];
  const dynamicObject = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(dynamicObject, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const j of i.keysToRemove) {
        delete dynamicObject[j];
      }
    }

    if (i.type === 'clear') {
      for (const a in dynamicObject) {
        delete dynamicObject[a];
      }
    }

    arrayResult.push({ ...dynamicObject });
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
