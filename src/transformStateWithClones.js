'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObject = [];
  let clone = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      clone = Object.assign({}, clone, actions[i].extraData);
      resultObject.push(clone);
    }

    if (actions[i].type === 'removeProperties') {
      for (let a = 0; a < actions[i].keysToRemove.length; a++) {
        delete clone[actions[i].keysToRemove[a]];
      }

      resultObject.push(clone);
    }

    if (actions[i].type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }

      resultObject.push(clone);
    }

    clone = Object.assign({}, resultObject[i]);
  }

  return resultObject;
}

module.exports = transformStateWithClones;
