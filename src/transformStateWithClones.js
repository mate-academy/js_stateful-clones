'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const useState = { ...state };

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      Object.assign(useState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        delete useState[action.keysToRemove[i]];
      }
    }

    if (action.type === 'clear') {
      for (const key in useState) {
        delete useState[key];
      }
    }
    arr.push({ ...useState });
  });

  return arr;
};

module.exports = transformStateWithClones;
