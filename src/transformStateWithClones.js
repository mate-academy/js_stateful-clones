'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const objToPushresult = { ...state };

  for (const obj of actions) {
    if (obj['type'] === 'clear') {
      for (const key in objToPushresult) {
        delete objToPushresult[key];
      }
    } else if (obj['type'] === 'addProperties') {
      Object.assign(objToPushresult, obj.extraData);
    } else if (obj['type'] === 'removeProperties') {
      for (const key of obj['keysToRemove']) {
        if (key in objToPushresult) {
          delete objToPushresult[key];
        }
      }
    }
    result.push({ ...objToPushresult });
  }

  return result;
}

module.exports = transformStateWithClones;
