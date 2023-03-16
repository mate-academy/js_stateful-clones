'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let initialState = { ...state };
  const result = [];

  actions.forEach(object => {
    if (object.type === 'addProperties') {
      initialState = {
        ...initialState,
        ...object.extraData,
      };
    } else if (object.type === 'removeProperties') {
      for (const key of object.keysToRemove) {
        delete initialState[key];
      }
    } else {
      initialState = {};
    }

    result.push({ ...initialState });
  });

  return result;
}

module.exports = transformStateWithClones;
