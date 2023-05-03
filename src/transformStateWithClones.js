'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArray = [stateCopy];

  for (const action of actions) {
    const values = Object.values(action);
    const lastState = stateArray[stateArray.length - 1];
    const clonedState = { ...lastState };

    if (values[0] === 'clear') {
      for (const property in clonedState) {
        delete clonedState[property];
      }
      stateArray.push(clonedState);
    }

    for (const properties of values.slice(1)) {
      switch (values[0]) {
        case 'addProperties':
          stateArray.push(clonedState);
          Object.assign(clonedState, properties);
          break;

        case 'removeProperties':
          for (const property of properties) {
            delete clonedState[property];
          }
          stateArray.push(clonedState);
          break;

        default:
          break;
      }
    }
  }

  return stateArray.slice(1);
}

module.exports = transformStateWithClones;
