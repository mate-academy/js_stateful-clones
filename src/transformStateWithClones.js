'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrResult = [];
  let refObject = { ...state };

  actions.forEach(element => {
    switch (element.type) {
      case 'addProperties':
        refObject = { ...refObject, ...element.extraData };
        break;
      case 'removeProperties':
        refObject = { ...refObject };

        element.keysToRemove.forEach(key => {
          delete refObject[key];
        });
        break;
      case 'clear':
        refObject = {};
        break;
    }
    arrResult.push({ ...refObject });
  });

  return arrResult;
}

module.exports = transformStateWithClones;
