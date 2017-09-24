import React from 'react';
import PropTypes from 'prop-types';
import createProps from '../createProps';
import getClass from '../classNames';

const propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node,
};

function FGrid(props) {
  const containerClass = getClass(props.fluid ? 'container-fluid' : 'container');
  const classNames = [props.className, containerClass];

  return React.createElement(props.tagName || 'div', createProps(propTypes, props, classNames));
}

FGrid.propTypes = propTypes;

const style = {
  paddingLeft: '1rem',
  paddingRight: '1rem',
};
export default function Grid(props) {
  return <FGrid {...props} style={style} />;
}

Grid.propTypes = propTypes;
