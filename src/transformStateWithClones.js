'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const stateCopy = Object.assign({}, state);
  const states = [];

  for (let i = 0; i < transforms.length; i++) {
    switch (transforms[i].operation) {
      case 'addProperties':
        for (const key in transforms[i].properties) {
          stateCopy[key] = transforms[i].properties[key];
        }
        break;

      case 'removeProperties':
        for (const key in transforms[i].properties) {
          delete stateCopy[transforms[i].properties[key]];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }
    states.push(Object.assign({}, stateCopy));
  }

  return states;
}

module.exports = transformStateWithClones;
