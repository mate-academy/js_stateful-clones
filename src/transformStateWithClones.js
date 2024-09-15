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
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        clone = {};
        break;

      default:
        throw new Error('unexpected action');
    }
    resultArr.push(clone);
    clone = Object.assign({}, resultArr[resultArr.length - 1]);
  }

  return resultArr;
}
module.exports = transformStateWithClones;
