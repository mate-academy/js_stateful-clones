'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let tempClone = cloneObj(state);

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      tempClone = Object.assign({}, tempClone, obj.extraData);
      states.push(cloneObj(tempClone));
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete tempClone[key];
      }

      states.push(cloneObj(tempClone));
    }

    if (obj.type === 'clear') {
      tempClone = {};
      states.push(cloneObj(tempClone));
    }
  }

  return states;
}

function cloneObj(obj) {
  return Object.assign({}, obj);
}

module.exports = transformStateWithClones;
