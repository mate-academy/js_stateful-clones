'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalResult = [];
  const newObj = {};

  Object.assign(newObj, state);

  for (const instruction of actions) {
    if (instruction.type === 'addProperties') {
      Object.assign(newObj, instruction.extraData);
      finalResult.push(Object.assign({}, newObj));
    }

    if (instruction.type === 'removeProperties') {
      for (const item of instruction.keysToRemove) {
        delete newObj[item];
      }

      finalResult.push(Object.assign({}, newObj));
    }

    if (instruction.type === 'clear') {
      for (const item in newObj) {
        delete newObj[item];
      }

      finalResult.push(Object.assign({}, newObj));
    }
  }

  return finalResult;
}

module.exports = transformStateWithClones;
