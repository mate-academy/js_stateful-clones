'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let temp = { ...state };

  for (const eachObj of actions) {
    if (eachObj.type === 'addProperties') {
      temp = {
        ...temp,
        ...eachObj.extraData,
      };
      res.push(temp);
    }

    if (eachObj.type === 'removeProperties') {
      const forDelete = { ...temp };

      for (const key of eachObj.keysToRemove) {
        delete forDelete[key];
      };

      res.push(forDelete);
      temp = forDelete;
    }

    if (eachObj.type === 'clear') {
      temp = {};
      res.push(temp);
    }
  }

  return res;
}

module.exports = transformStateWithClones;
