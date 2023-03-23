'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const camelCase = Object.assign({}, state);
  const res = [];

  for (const action in actions) {
    const operation = actions[action];

    switch (operation.type) {
      case 'addProperties':
        Object.assign(camelCase, operation.extraData);
        break;

      case 'removeProperties':
        for (const key of operation.keysToRemove) {
          delete camelCase[key];
        }
        break;

      case 'clear':
        for (const key in camelCase) {
          delete camelCase[key];
        }
    }

    res.push(Object.assign({}, camelCase));
  }

  return res;
}

module.exports = transformStateWithClones;
