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

  actions.forEach(({ type, extraData, keysToRemove }) => {
    switch (type) {
      case 'addProperties':
        temp = Object.assign(temp, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach(item => {
          if (temp[item]) {
            delete temp[item];
          }
        });
        break;
      case 'clear':
        for (const key in temp) {
          delete temp[key];
        };
        break;
    };
    res.push({ ...temp });
  });

  return res;
};

module.exports = transformStateWithClones;
