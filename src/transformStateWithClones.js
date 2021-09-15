'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let obj = { ...state };
  const result = [];

  for (const values of actions) {
    switch (values['type']) {
      case 'addProperties':
        const clone = Object.assign({}, obj, values['extraData']);

        result.push(clone);
        obj = clone;
        break;

      case 'removeProperties':
        const del = Object.assign({}, obj);

        for (const key of values['keysToRemove']) {
          delete del[key];
        }

        result.push(del);
        obj = del;
        break;

      case 'clear':
        const newObj = {};

        result.push(newObj);
        obj = newObj;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
