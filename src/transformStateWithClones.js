'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let copy = { ...state };

  for (const obj of transforms) {
    switch (obj.operation) {
      case 'addProperties': {
        Object.assign(copy, obj.properties);
        break;
      }

      case 'removeProperties' :
        for (const arrKey of obj.properties) {
          delete copy[arrKey];
        }
        break;

      case 'clear' :
        copy = {};
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
