'use strict';

function transformStateWithClones(state, transforms) {
  let variableState = { ...state };
  const clonedStates = [];

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        Object.assign(variableState, transform.properties);
        break;

      case 'removeProperties':
        transform.properties.forEach(items => delete variableState[items]);
        break;

      case 'clear':
        variableState = {};
        break;
    }

    clonedStates.push({ ...variableState });
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
