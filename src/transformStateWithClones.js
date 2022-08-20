'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };
  let secObj = {};

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      for (const [key, value] of Object.entries(extraData)) {
        stateCopy[key] = value;
      }
      secObj = { ...stateCopy };
      result.push(secObj);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete stateCopy[key];
      }
      secObj = { ...stateCopy };
      result.push(secObj);
    }

    if (type === 'clear') {
      for (const key of Object.keys(stateCopy)) {
        delete stateCopy[key];
      }
      secObj = { ...stateCopy };
      result.push(secObj);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
