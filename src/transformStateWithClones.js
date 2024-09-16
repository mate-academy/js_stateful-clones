'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let resultObj = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          resultObj[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete resultObj[key]);
        break;

      case 'clear':
        resultObj = {};
        break;
    }
    result.push(Object.assign({}, resultObj));
  }

  return result;
}

module.exports = transformStateWithClones;
