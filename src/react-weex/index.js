import ReactReconciler from 'react-reconciler';
import weexDriver from 'weex-driver';

const EVENT_PREFIX_REGEXP = /^on[A-Z]/;

const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {
    weexDriver.beforeRender();
  },
  resetAfterCommit: () => {
    weexDriver.afterRender();
  },
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    // return typeof props.children === 'string' || typeof props.children === 'number';
    return type === 'text';
  },
  /**
   This is where react-reconciler wants to create an instance of UI element in terms of the target. Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. The initial values of domElement attributes can be set in this function from the newProps argument
   */
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    return weexDriver.createElement({ type, props: newProps });
  },
  // createTextInstance: text => {
  //   return weexDriver.createText(text);
  // },
  appendInitialChild: (parent, child) => {

    weexDriver.appendChild(child, parent);
  },
  appendChild(parent, child) {
    weexDriver.appendChild(child, parent);
  },
  finalizeInitialChildren: (domElement, type, props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    weexDriver.appendChild(child, parent);
  },
  // 计算出一个更新的 updatePayload
  prepareUpdate(domElement, oldProps, newProps) {
    return true;
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    const keys = [...new Set([...Object.keys(newProps), ...Object.keys(oldProps)])];
    keys.forEach(propName => {
      const propValue = newProps[propName];
      const oldPropValue = oldProps[propName];
      if (propName === 'children') {
        if (type === 'text') {
          // domElement.value = propValue;
          weexDriver.setAttribute(domElement, 'value', propValue);
        }
      } else if (propName === 'style') {
        weexDriver.setStyles(domElement, newProps[propName]);
      } else if (propValue === undefined) {
        weexDriver.removeAttribute(domElement, propName, propValue);
      } else if (EVENT_PREFIX_REGEXP.test(propName)) {
        const eventName = propName.slice(2).toLowerCase();
        if (oldPropValue !== propValue) {
          weexDriver.removeEventListener(domElement, eventName, oldPropValue);
          weexDriver.addEventListener(domElement, eventName, propValue);
        }
      } else {
        weexDriver.setAttribute(domElement, propName, propValue);
      }
    });
  },
  // commitTextUpdate(textInstance, oldText, newText) {
  //   weexDriver.updateText(textInstance, newText);
  // },
  removeChild(parentInstance, child) {
    weexDriver.removeChild(child, parentInstance);
  }
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

export default {
  render: (reactElement, callback) => {
    const domElement = weexDriver.createBody();
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  }
};
