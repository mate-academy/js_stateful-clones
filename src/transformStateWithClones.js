'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const states = [];
  let stateClone = Object.assign({}, state);

  for (let i = 0; i < transforms.length; i++) {
    const transformsIndex = transforms[i];

    if (transformsIndex.operation === 'addProperties') {
      for (const add in transformsIndex.properties) {
        stateClone[add] = transformsIndex.properties[add];
      }

      states.push(Object.assign({}, stateClone));
    }

    if (transformsIndex.operation === 'removeProperties') {
      for (const remov of transformsIndex.properties) {
        delete stateClone[remov];
      }

      states.push(Object.assign({}, stateClone));
    }

    if (transformsIndex.operation === 'clear') {
      stateClone = {};
      states.push({});
    }
  }

  return states;
}

module.exports = transformStateWithClones;
