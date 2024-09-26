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
  let stateCopy = { ...state };

  for (const instruction of transforms) {
    switch (instruction.operation) {
      case 'addProperties': {
        for (const property in instruction.properties) {
          stateCopy[property] = instruction.properties[property];
        }

        break;
      }

      case 'clear': {
        stateCopy = {};
        break;
      }

      case 'removeProperties': {
        for (const property of instruction.properties) {
          delete stateCopy[property];
        }

        break;
      }
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
