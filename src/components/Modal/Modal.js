import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { camera, chooseCamera } = this.props;

    if (camera !== undefined) {
      chooseCamera(camera)
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Modal;