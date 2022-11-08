'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const object = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const obj = actions[i];

    if (obj.type === 'addProperties') {
      for (const key in obj.extraData) {
        object[key] = obj.extraData[key];
      }
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete object[key];
      }
    } else if (obj.type === 'clear') {
      for (const key in object) {
        delete object[key];
      }
    }

    array.push({ ...object });
  }

  return array;
}

module.exports = transformStateWithClones;
