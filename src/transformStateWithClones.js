'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = Object.assign({}, state);
  const stateArr = [];

  for (const properties of actions) {
    switch (properties.type) {
      case 'addProperties':
        Object.assign(res, properties.extraData);
        break;

      case 'removeProperties':
        for (const key of properties.keysToRemove) {
          delete res[key];
        }
        break;

      case 'clear':
        for (const key in res) {
          delete res[key];
        }
    }

    stateArr.push({ ...res });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
