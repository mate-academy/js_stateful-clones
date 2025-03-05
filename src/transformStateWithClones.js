'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let previousObject = { ...state };
  const result = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      previousObject = { ...previousObject, ...action.extraData };
    } else if (action.type === 'clear') {
      previousObject = {};
    } else if (action.type === 'removeProperties') {
      previousObject = { ...previousObject };

      action.keysToRemove.forEach((key) => {
        delete previousObject[key];
      });
    }

    result.push({ ...previousObject });
  });

  return result;
}

module.exports = transformStateWithClones;
