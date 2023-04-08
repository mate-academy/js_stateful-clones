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
        res.push({ ...temp });
        break;
      case 'removeProperties':
        keysToRemove.forEach(item => {
          if (temp[item]) {
            delete temp[item];
          }
        });
        res.push({ ...temp });
        break;
      case 'clear':
        for (const key in temp) {
          delete temp[key];
        };
        res.push({ ...temp });
        break;
    };
  });

  return res;
};

module.exports = transformStateWithClones;
