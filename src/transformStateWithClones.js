'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const properties = [];

  actions.forEach(object => {
    switch (object.type) {
      case 'addProperties':
        Object.assign(stateCopy, object.extraData);
        properties.push({ ...stateCopy });
        break;

      case 'removeProperties':
        object.keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        properties.push({ ...stateCopy });
        break;

      case 'clear': {
        stateCopy = {};
        properties.push({});
      }
    }
  });

  return properties;
}

module.exports = transformStateWithClones;
