import React, { PureComponent, PropTypes } from 'react';
import color from 'color';

export default class EventWrapper extends PureComponent {
  render() {
    const { event } = this.props;
    const className = `${event.id.replace(/\|/g, '-')}_${event._raw.color.replace('#', '')}`;

    return (
      <div className={className}>
        <style>
          {
            `
            .${className} > div {
              background-color: ${event._raw.color} !important;
              border-color: ${color(event._raw.color).darken(0.5).rgb().string()} !important;
            }
            `
          }
        </style>
        { this.props.children }
      </div>
    );
  }
}

EventWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  event: PropTypes.shape({
    _raw: PropTypes.shape({
      color: PropTypes.string,
    }),
  }).isRequired,
};
