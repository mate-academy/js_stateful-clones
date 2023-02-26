'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const mainArr = [];
  const helpArr = [];

  helpArr.push(state);

  for (let i = 0; i < actions.length; i++) {
    const copy = Object.assign({}, helpArr[i]);
    const firstObj = actions[i];

    if (firstObj.type === 'addProperties') {
      const secondObj = firstObj.extraData;

      for (const key in secondObj) {
        copy[key] = secondObj[key];
      }
    }

    if (firstObj.type === 'removeProperties') {
      const secondObj = firstObj.keysToRemove;

      for (const key of secondObj) {
        delete copy[key];
      }
    }

    if (firstObj.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }

    mainArr.push(copy);
    helpArr.push(copy);
  }

  return mainArr;
}

module.exports = transformStateWithClones;
