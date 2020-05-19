'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  // write code here

  const history = [];
  const cloneState = {
    ...state,
  };
  const OPERATION = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };

  for (const key of transforms) {
    if (key.operation === OPERATION.add) {
      for (const keyAdd in key.properties) {
        cloneState[keyAdd] = key.properties[keyAdd];
      };
    }

    if (key.operation === OPERATION.remove) {
      for (const keyRemove in key.properties) {
        delete cloneState[key.properties[keyRemove]];
      }
    }

    if (key.operation === OPERATION.clear) {
      for (const keyRemove in cloneState) {
        delete cloneState[keyRemove];
      }
    }

    history.push({
      ...cloneState,
    });
  }

  return history;
}

module.exports = transformStateWithClones;
