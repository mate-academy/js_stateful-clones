'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let obj = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      obj = {};
    } else if (action.type === 'addProperties') {
      obj = { ...obj, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      obj = Object.fromEntries(
        Object.entries(obj).filter(
          ([key]) => !action.keysToRemove.includes(key),
        ),
      );
    }

    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
