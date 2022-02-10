'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let person = { ...state };
  const resultArr = [];

  for (const prop of actions) {
    switch (prop.type) {
      case 'addProperties':
        Object.assign(person, prop.extraData);
        break;

      case 'removeProperties':
        for (const key of prop.keysToRemove) {
          delete person[key];
        }
        break;

      case 'clear':
        person = {};
        break;
    }
    resultArr.push({ ...person });
  }

  return resultArr;
}
module.exports = transformStateWithClones;
