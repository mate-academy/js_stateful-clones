'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const resultArr = [];

  for (const el of actions) {
    switch (el.type) {
      case 'addProperties':
        Object.assign(clone, el.extraData);
        break;
      case 'removeProperties':
        for (const element of el.keysToRemove) {
          delete clone[element];
        };
        break;
      case 'clear':
        Object.keys(clone).forEach(element => {
          delete clone[element];
        });
        break;
    }

    resultArr.push({ ...clone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
