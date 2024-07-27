'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
function transformStateWithClones(state, actions) {
  const result = [];
  const objWithAddedProps = (obj, extraData) =>
    Object.assign({}, obj, extraData);
  const stateCopyWithRemovedProps = (obj) => Object.assign({}, obj);

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        // if our 'result' arr has no therefore we use state obj
        if (!result.length) {
          result.push(objWithAddedProps(state, item.extraData));
        } else {
          // if our 'result' arr has last item then we use last item
          result.push(
            objWithAddedProps(result[result.length - 1], item.extraData),
          );
        }
        break;

      case 'removeProperties':
        // if our 'result' arr has no therefore we use state obj
        let objCopyWithRemovedProps;

        if (!result.length) {
          objCopyWithRemovedProps = stateCopyWithRemovedProps(state);

          // if our 'result' arr has last item then we use last item
        } else {
          objCopyWithRemovedProps = stateCopyWithRemovedProps(
            result[result.length - 1],
          );
        }

        for (const key in item.keysToRemove) {
          const propKeyToRemove = item.keysToRemove[key];

          delete objCopyWithRemovedProps[propKeyToRemove];
        }
        result.push(objCopyWithRemovedProps);
        break;

      case 'clear':
        result.push({});
        break;
      default:
        console.log('Ocureed error , please fix it');
    }
  }

  return result;
}

module.exports = transformStateWithClones;
