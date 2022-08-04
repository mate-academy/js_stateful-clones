'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = copyObject(state);
  const clone = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        clone.push(copyObject(copyState));
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        clone.push(copyObject(copyState));
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        clone.push({});
        break;
    }
  }

  return clone;
}

function copyObject(object) {
  const copy = Object.assign({}, object);

  return copy;
}

module.exports = transformStateWithClones;
