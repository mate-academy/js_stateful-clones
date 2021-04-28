'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  let cloneState = {
    ...state,
  };

  const states = [];

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        Object.assign(cloneState, transform.properties);

        break;

      case 'removeProperties':
        for (const key of transform.properties) {
          delete cloneState[key];
        }

        break;

      case 'clear':
        cloneState = {};
        break;
    }
    states.push({ ...cloneState });
  }

  return states;
}

module.exports = transformStateWithClones;
