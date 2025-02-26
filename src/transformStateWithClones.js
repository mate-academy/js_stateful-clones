'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevObj = { ...state };
  const result = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      prevObj = { ...prevObj, ...action.extraData };
    } else if (action.type === 'clear') {
      prevObj = {};
    } else if (action.type === 'removeProperties') {
      prevObj = { ...prevObj };

      action.keysToRemove.forEach((key) => {
        delete prevObj[key];
      });
    }

    result.push({ ...prevObj });
  });

  return result;
}

module.exports = transformStateWithClones;
