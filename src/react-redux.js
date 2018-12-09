import React, { Component } from "react";
import PropTypes from "prop-types";

export const connect = mapStateToProps => WrappedComponent => {
  class Connect extends Component {
    static contextType = {
      store: PropTypes.object
    };

    constructor() {
      super();
      this.state = { allProps: {} };
    }

    componentWillMount() {
      const { store } = this.__getContextValue();
      this._updateProps();
      store.subscribe(() => this._updateProps());
    }

    __getContextValue() {
      return this.context;
    }

    _updateProps() {
      const { store } = this.__getContextValue();
      let stateProps = mapStateToProps(store.getState(), this.props);
      this.setState({
        allProps: {
          ...stateProps,
          ...this.props
        }
      });
    }

    render() {
      return <WrappedComponent {...this.state.allProps} />;
    }
  }

  return Connect;
};
