'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clones = [state];

  actions.forEach(handleAction);

  clones.shift();

  return clones;

  function handleAction({ type, extraData, keysToRemove }) {
    const lastState = clones[clones.length - 1];

    switch (type) {
      case 'addProperties':
        clones = [
          ...clones,
          addProperties(lastState, extraData),
        ];
        break;

      case 'removeProperties':
        clones = [
          ...clones,
          removeProperties(lastState, keysToRemove),
        ];
        break;

      case 'clear':
        clones = [
          ...clones,
          {},
        ];
        break;

      default:
        throw new Error('Wrong action type!');
    }
  }

  function addProperties(object, extraProperties) {
    return {
      ...object,
      ...extraProperties,
    };
  }

  function removeProperties(object, keysToDelete) {
    const newObj = { ...object };

    keysToDelete.forEach(key => {
      delete newObj[key];
    });

    return newObj;
  }
}

module.exports = transformStateWithClones;
