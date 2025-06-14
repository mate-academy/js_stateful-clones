'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = structuredClone(state);

  actions.forEach((el) => {
    switch (el.type) {
      case 'addProperties':
        addProperties(el.extraData);
        break;
      case 'removeProperties':
        removeProperties(el.keysToRemove);
        break;
      default:
        clear();
    }
  });

  const addProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
      stateCopy[key] = obj[key];
    });

    return stateCopy;
  };

  const removeProperties = (obj) => {
    Object.keys(obj).forEach((key) => {
      delete stateCopy[key];
    });

    return stateCopy;
  };

  const clear = () => {
    return {};
  };
}

module.exports = transformStateWithClones;
