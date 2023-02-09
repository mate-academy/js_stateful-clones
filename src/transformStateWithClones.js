'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let clone = JSON.parse(JSON.stringify(state));
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          const prop = action.extraData[data];

          clone[data] = prop;
        }
        resultArr.push(clone);
        clone = { ...resultArr[resultArr.length - 1] };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        resultArr.push(clone);
        clone = { ...resultArr[resultArr.length - 1] };
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        resultArr.push(clone);
        clone = { ...resultArr[resultArr.length - 1] };
        break;

      default:
        throw new Error('unexpected action');
    }
  }

  return resultArr;
}
module.exports = transformStateWithClones;
