import Queue from './queue';
import { TEXT, STYLE, CHILDREN, EVENT_PREFIX_REGEXP } from './util';
import { getChildrenText } from './textUtil';
import * as weexDriver from 'driver-weex';
import { hasOwnProperty } from './util';

export const updateTypes = {
  reset: 0,
  set: 1,
  setStyle: 2,
  addEvent: 3,
  removeEvent: 4
};

/**
 *
 * @param {*} domElement
 * @param {Object} oldProps
 * @param {Object} newProps
 */
export default function diffProps(domElement, _type, oldProps, newProps) {
  const isTextNode = _type === TEXT;
  let updatePayload = new Queue();

  const keys = Object.keys(oldProps);

  for (let propName in oldProps) {
    if (
      hasOwnProperty.call(oldProps, propName) &&
      !hasOwnProperty.call(newProps, propName)
    ) {
      const propValue = oldProps[propName];
      if (propName === CHILDREN) {
        if (isTextNode) {
          updatePayload.push({ op: updateTypes.reset, name: 'value' });
        }
      } else if (propName === STYLE) {
        updatePayload.push({
          op: updateTypes.setStyle,
          name: STYLE,
          value: null
        });
      } else if (EVENT_PREFIX_REGEXP.test(propName)) {
        // remove EventListener
        const eventName = propName.slice(2).toLowerCase();
        updatePayload.push({
          op: updateTypes.removeEvent,
          name: eventName,
          value: propValue
        });
      } else {
        updatePayload.push({
          op: updateTypes.reset,
          name: propName,
          value: propValue
        });
      }
    }
  }

  for (let propName in newProps) {
    if (hasOwnProperty.call(newProps, propName)) {
      const value = newProps[propName];
      const oldValue = oldProps[propName];
      if (value === oldValue) {
        continue;
      } else if (propName === CHILDREN) {
        if (isTextNode) {
          updatePayload.push({
            op: updateTypes.set,
            name: 'value',
            value: getChildrenText(newProps[propName])
          });
        }
      } else if (propName === STYLE) {
        // should we shallow compare the styles ?
        updatePayload.push({ op: updateTypes.setStyle, name: propName, value });
      } else if (EVENT_PREFIX_REGEXP.test(propName)) {
        // change EventListener
        const eventName = propName.slice(2).toLowerCase();

        if (hasOwnProperty.call(oldProps, propName)) {
          updatePayload.push({
            op: updateTypes.removeEvent,
            name: eventName,
            value: oldValue
          });
        }

        updatePayload.push({
          op: updateTypes.addEvent,
          name: eventName,
          value
        });
      } else {
        updatePayload.push({ op: updateTypes.set, name: propName, value });
      }
    }
  }

  return updatePayload;
}

export const applyUpdate = (update, domElement, props) => {
  const { op, name, value } = update;

  switch (op) {
    case updateTypes.reset:
      weexDriver.removeAttribute(domElement, name, value);
      break;
    case updateTypes.set:
      weexDriver.setAttribute(domElement, name, value);
      break;
    case updateTypes.addEvent:
      weexDriver.addEventListener(domElement, name, value, props);
      break;
    case updateTypes.removeEvent:
      weexDriver.removeEventListener(domElement, name, value);
      break;
    case updateTypes.setStyle:
      weexDriver.setStyle(domElement, value);
      break;
    default:
      break;
  }
};
