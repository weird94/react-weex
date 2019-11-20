import React from 'react';

export const getChildrenText = children => {
  const type = typeof children;

  switch (type) {
    case 'string':
    case 'number':
    case 'bigint':
      return children;
    case 'object':
      if (children instanceof Array) {
        return React.Children.toArray().join('');
      } else {
        return children.toString();
      }
    default:
      return '';
  }
};

export const getTextProps = props => {
  const { children, ...ext } = props;

  return {
    ...ext,
    value: getChildrenText(children)
  };
};
