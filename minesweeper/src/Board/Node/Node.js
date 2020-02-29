import React, { Component } from "react";
import "./Node.css";

export class Node extends Component {
  render() {
    const { row, col, onClick, onContextMenu, isMine } = this.props;
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node`}
        onClick={() => onClick(row, col)}
        onContextMenu={() => onContextMenu(row, col)}
      ></div>
    );
  }
}

export default Node;
