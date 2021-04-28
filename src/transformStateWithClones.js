'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const states = [];
  let stateClone = {
    ...state,
  };

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        add(transform.properties);
        break;

      case 'removeProperties':
        remove(transform.properties);
        break;

      case 'clear':
        clear();
        break;
    };
    states.push({ ...stateClone });
  };

  function add(properties) {
    Object.assign(stateClone, properties);
  };

  function remove(properties) {
    for (const property of properties) {
      if (stateClone.hasOwnProperty(property)) {
        delete stateClone[property];
      };
    };
  };

  function clear() {
    stateClone = {};
  };

  return states;
};

module.exports = transformStateWithClones;
