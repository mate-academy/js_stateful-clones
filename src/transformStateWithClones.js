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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        tempClone = Object.assign(tempClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tempClone[key];
        }
        break;

      case 'clear':
        tempClone = {};
        break;

      default:
        break;
    }

    states.push(cloneObj(tempClone));
  }

  return states;
}

function cloneObj(obj) {
  return Object.assign({}, obj);
}

module.exports = transformStateWithClones;
