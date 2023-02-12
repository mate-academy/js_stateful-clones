'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesArr = [];
  let stateCopy = { ...state };
  let addCopy;

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        const addProps = obj.extraData;

        addCopy = {
          ...stateCopy,
          ...addProps,
        };

        clonesArr.push(addCopy);
        stateCopy = Object.assign({}, addCopy);

        break;

      case 'removeProperties':
        const removeProps = obj.keysToRemove;

        for (const key of Object.keys(stateCopy)) {
          if (removeProps.indexOf(key) !== -1) {
            delete stateCopy[key];
          }
        }

        clonesArr.push(stateCopy);
        break;

      default:
        const emptyObj = {};

        stateCopy = Object.assign({}, emptyObj);
        clonesArr.push(emptyObj);

        break;
    }
  }

  return clonesArr;
}

module.exports = transformStateWithClones;
