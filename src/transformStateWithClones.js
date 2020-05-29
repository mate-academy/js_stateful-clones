'use strict';

function transformStateWithClones(state, transforms) {
  const clonedStates = [{ ...state }];

  for (let i = 0; i < transforms.length; i++) {
    switch (transforms[i].operation) {
      case 'addProperties':
        clonedStates.push(Object.assign(
          {},
          clonedStates[i],
          transforms[i].properties
        ));
        break;

      case 'removeProperties':
        clonedStates.push({ ...clonedStates[i] });

        for (const propertie of transforms[i].properties) {
          delete clonedStates[i + 1][propertie];
        }
        break;

      case 'clear':
        clonedStates.push({});
        break;
    }
  }

  clonedStates.shift();

  return clonedStates;
}

module.exports = transformStateWithClones;
