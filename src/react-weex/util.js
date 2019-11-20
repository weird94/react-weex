export const EVENT_PREFIX_REGEXP = /^on[A-Z]/;
export const TEXT = 'text';
export const STYLE = 'style';
export const CHILDREN = 'children';

export const eventTester = key => EVENT_PREFIX_REGEXP.test(key);

export const hasOwnProperty = Object.prototype.hasOwnProperty;
