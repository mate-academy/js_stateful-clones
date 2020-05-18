'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const object = ({ ...state });
  const result = [];

  for (const trans of transforms) {
    if (trans.operation === 'addProperties') {
      for (const key in trans.properties) {
        object[key] = trans.properties[key];
      }
    } else if (trans.operation === 'removeProperties') {
      for (const key in trans.properties) {
        if (object.hasOwnProperty(trans.properties[key])) {
          delete object[trans.properties[key]];
        }
      }
    } else if (trans.operation === 'clear') {
      for (const key in object) {
        delete object[key];
      }
    }

    result.push({ ...object });
  }

  return result;
}

module.exports = transformStateWithClones;
