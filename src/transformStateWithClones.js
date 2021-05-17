'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const states = [];
  const copiedState = { ...state };

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        Object.assign(copiedState, transform.properties);
        break;

      case 'removeProperties':
        for (const key of transform.properties) {
          delete copiedState[key];
        }
        break;

      case 'clear':
        for (const key in copiedState) {
          delete copiedState[key];
        }
    }

    states.push(Object.assign({}, copiedState));
  }

  return states;
}

module.exports = transformStateWithClones;
