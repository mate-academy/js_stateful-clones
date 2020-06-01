'use strict';

function transformStateWithClones(state, transforms) {
  const copyState = Object.assign({}, state);
  const arrTransorm = [];
  const OPERATIONS = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };

  for (const transform of transforms) {
    switch (transform.operation) {
      case OPERATIONS.add:
        Object.assign(copyState, transform.properties);
        arrTransorm.push(Object.assign({}, copyState));
        break;
      case OPERATIONS.remove:
        for (const key of transform.properties) {
          delete copyState[key];
        }
        arrTransorm.push(Object.assign({}, copyState));
        break;
      case OPERATIONS.clear:
        for (const value of Object.keys(copyState)) {
          delete copyState[value];
        };
        arrTransorm.push(Object.assign({}));
        break;
    }
  }

  return arrTransorm;
}

module.exports = transformStateWithClones;
