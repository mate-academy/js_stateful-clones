'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalResult = [];
  const newObj = { ...state };

  for (const instruction of actions) {
    switch (instruction.type) {
      case 'addProperties':
        Object.assign(newObj, instruction.extraData);
        break;
      case 'removeProperties':
        for (const item of instruction.keysToRemove) {
          delete newObj[item];
        };
        break;
      case 'clear':
        for (const item in newObj) {
          delete newObj[item];
        };
        break;
      default:
        break;
    }

    finalResult.push(Object.assign({}, newObj));
  }

  return finalResult;
}

module.exports = transformStateWithClones;
