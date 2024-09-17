'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
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

  for (const transform of transforms) {
    if (transform.operation === OPERATION.add) {
      for (const keyAdd in transform.properties) {
        cloneState[keyAdd] = transform.properties[keyAdd];
      };
    }

    if (transform.operation === OPERATION.remove) {
      for (const keyRemove in transform.properties) {
        delete cloneState[transform.properties[keyRemove]];
      }
    }

    if (transform.operation === OPERATION.clear) {
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
