'use strict';

function transformStateWithClones(state, transforms) {
  const states = [];
  let copyState = { ...state };

  for (const transform of transforms) {
    copyState = { ...copyState };

    switch (transform.operation) {
      case ('removeProperties') :
        for (const key of transform.properties) {
          delete copyState[key];
        }

        break;

      case ('addProperties'):
        Object.assign(copyState, transform.properties);

        break;

      case ('clear'):
        copyState = {};
        break;
    }

    states.push(copyState);
  }

  return states;
}

module.exports = transformStateWithClones;
