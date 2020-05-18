'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const _coolState = { ...state };
  const _cloneDetect = [];

  transforms.forEach((item) => {
    const {operation} = item;

    switch (_operation) {
      case 'addProperties':
        Object.assign(_coolState, item['properties']);
        break;
      case 'removeProperties':
        item.properties.forEach(_delItem => {
          delete _coolState[_delItem];
        });
        break;
      case 'clear':
        for (const _delKey in _coolState) {
          delete _coolState[_delKey];
        }
        break;
    }

    _cloneDetect.push({ ..._coolState });
  });

  return _cloneDetect;
}

module.exports = transformStateWithClones;
