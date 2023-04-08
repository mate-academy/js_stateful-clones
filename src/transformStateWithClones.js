'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let temp = { ...state };
  const res = [];

  actions.forEach(action => {
    if (action['type'] === 'addProperties') {
      temp = Object.assign(temp, action['extraData']);
      res.push({ ...temp });
    }

    if (action['type'] === 'removeProperties') {
      action['keysToRemove'].forEach(item => {
        if (temp[item]) {
          delete temp[item];
        }
      });
      res.push({ ...temp });
    };

    if (action['type'] === 'clear') {
      for (const key in temp) {
        delete temp[key];
      };
      res.push({ ...temp });
    }
  });

  return res;
};

module.exports = transformStateWithClones;
