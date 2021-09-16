'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let obj = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const newObj = {
          ...obj,
          ...action.extraData,
        };

        result.push(newObj);
        obj = newObj;
        break;

      case 'removeProperties':
        const cleanObj = { ...obj };

        for (const key of action.keysToRemove) {
          delete cleanObj[key];
        }
        result.push(cleanObj);
        obj = cleanObj;
        break;

      case 'clear':
        result.push({});
        obj = {};
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
