'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let copyOfStateObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfStateObj, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete copyOfStateObj[item];
        }
        break;

      case 'clear':
        copyOfStateObj = {};
        break;
    }
    resultArr.push({ ...copyOfStateObj });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
