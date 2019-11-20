import ReactReconciler from 'react-reconciler';
import * as weexDriver from 'driver-weex';
import { getTextProps } from './textUtil';
import diffProps, { applyUpdate } from './diffProps';

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
  // 判断是否应该直接设置 text, 在weex中应该是true, 因为weex中没有 TextInstance
  shouldSetTextContent: (type, _nextProps) => {
    return type === 'text';
    // return false;
  },
  resetTextContent: parent => {
    weexDriver.updateText(parent, '');
  },
  createInstance: (
    type,
    newProps,
    _rootContainerInstance,
    _currentHostContext,
    _workInProgress
  ) => {
    if (type === 'text') {
      return weexDriver.createElement(type, getTextProps(newProps));
    } else {
      return weexDriver.createElement(type, newProps);
    }
  },
  createTextInstance: text => {
    return weexDriver.createText(text);
  },
  appendInitialChild: (parent, child) => {
    weexDriver.appendChild(child, parent);
  },
  appendChild(parent, child) {
    weexDriver.appendChild(child, parent);
  },
  finalizeInitialChildren: (_domElement, _type, _props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    weexDriver.appendChild(child, parent);
  },
  // 计算出一个更新的 updatePayload
  // DOM 节点的 diff 计算
  prepareUpdate: diffProps,
  commitUpdate(domElement, updatePayload, _type, _oldProps, newProps) {
    updatePayload.forEach(update => {
      applyUpdate(update, domElement, newProps);
    });
  },
  commitTextUpdate(textInstance, _oldText, newText) {
    weexDriver.updateText(textInstance, newText);
  },
  removeChild(parentInstance, child) {
    weexDriver.removeChild(child, parentInstance);
  }
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

export default {
  render: (reactElement, callback) => {
    const domElement = weexDriver.createBody('div', { style: { flex: 1 } });
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(
        domElement,
        false
      );
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
