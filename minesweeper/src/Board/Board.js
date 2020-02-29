import React, { Component } from "react";
import Node from "./Node/Node";
import "./Board.css";

export class Board extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      totNumMines: 0, //Number of mines on the entire grid
      minesFlagged: 0, //Number of mines *correctly* flagged
      clickCount: 0,
      count: 0
    };
  }

  /**
   * Clicks a node
   * @param {row of clicked node} row
   * @param {column of clicked node} col
   */
  handleClick(row, col) {
    const { grid } = this.state;
    grid[row][col].isVisited = true;
    const numSurr = this.getNumSurrMines(row, col);
    if (this.state.grid[row][col].isFlagged) {
      this.state.clickCount += 1;
    } else if (this.state.clickCount === 0) {
      this.startCount();
      this.purgeSurr(row, col);
      this.state.clickCount = 1;
      this.handleClick(row, col);
    } else if (grid[row][col].isMine) {
      grid.map((r, rInd) => {
        r.map((c, cInd) => {
          if (grid[rInd][cInd].isMine) {
            document.getElementById(`node-${rInd}-${cInd}`).classList =
              "node node-mined";
          }
        });
      });
      document.getElementById(`node-${row}-${col}`).classList =
        "node node-1st-mine";
      document.getElementById("reset").style.backgroundImage = "url(sad.png)";
      setTimeout(() => this.lose(), 50);
    }
    //Clicks surrounding mines if there are none around
    else if (numSurr === 0) {
      document.getElementById(`node-${row}-${col}`).classList =
        "node node-visited";

      setTimeout(() => this.clickSurr(row, col));
    } else {
      document.getElementById(`node-${row}-${col}`).classList =
        "node node-" + numSurr;
    }
  }

  /**
   * Returns the total number of surrounding mines of a node
   * @param {row of clicked node} row
   * @param {column of clicked node} col
   */
  getNumSurrMines(row, col) {
    let num = 0;
    const { grid } = this.state;
    //Left, Right, Up, Down
    if (row > 0 && grid[row - 1][col].isMine) num++;
    if (row < 24 && grid[row + 1][col].isMine) num++;
    if (col > 0 && grid[row][col - 1].isMine) num++;
    if (col < 39 && grid[row][col + 1].isMine) num++;
    //Diagonals
    if (row > 0 && col > 0 && grid[row - 1][col - 1].isMine) num++;
    if (row < 24 && col > 0 && grid[row + 1][col - 1].isMine) num++;
    if (row > 0 && col < 39 && grid[row - 1][col + 1].isMine) num++;
    if (row < 24 && col < 39 && grid[row + 1][col + 1].isMine) num++;
    return num;
  }

  /**
   * Clicks every node around another node (Due to it not being surrounded by any mines)
   * @param {row of clicked node} row
   * @param {column of clicked node} col
   */
  clickSurr(row, col) {
    const { grid } = this.state;
    if (
      row > 0 &&
      !grid[row - 1][col].isVisited &&
      !grid[row - 1][col].isFlagged
    )
      this.handleClick(row - 1, col);
    if (
      row < 24 &&
      !grid[row + 1][col].isVisited &&
      !grid[row + 1][col].isFlagged
    )
      this.handleClick(row + 1, col);
    if (
      col > 0 &&
      !grid[row][col - 1].isVisited &&
      !grid[row][col - 1].isFlagged
    )
      this.handleClick(row, col - 1);
    if (
      col < 39 &&
      !grid[row][col + 1].isVisited &&
      !grid[row][col + 1].isFlagged
    )
      this.handleClick(row, col + 1);
    //Diagonals
    if (
      row > 0 &&
      col > 0 &&
      !grid[row - 1][col - 1].isVisited &&
      !grid[row - 1][col - 1].isFlagged
    )
      this.handleClick(row - 1, col - 1);
    if (
      row < 24 &&
      col > 0 &&
      !grid[row + 1][col - 1].isVisited &&
      !grid[row + 1][col - 1].isFlagged
    )
      this.handleClick(row + 1, col - 1);
    if (
      row > 0 &&
      col < 39 &&
      !grid[row - 1][col + 1].isVisited &&
      !grid[row - 1][col + 1].isFlagged
    )
      this.handleClick(row - 1, col + 1);
    if (
      row < 24 &&
      col < 39 &&
      !grid[row + 1][col + 1].isVisited &&
      !grid[row + 1][col + 1].isFlagged
    )
      this.handleClick(row + 1, col + 1);
  }
  /**
   * Removes all mines around a click for the first click
   * @param {row of clicked node} row
   * @param {column of clicked node} col
   */
  purgeSurr(row, col) {
    const { grid } = this.state;
    const counter = document.getElementById("counter");
    if (grid[row][col].isMine) {
      grid[row][col].isMine = false;
    }
    //Left, Right, Up, Down
    if (row > 0 && grid[row - 1][col].isMine) {
      grid[row - 1][col].isMine = false;
    }
    if (row < 24 && grid[row + 1][col].isMine) {
      grid[row + 1][col].isMine = false;
    }
    if (col > 0 && grid[row][col - 1].isMine) {
      grid[row][col - 1].isMine = false;
    }
    if (col < 39 && grid[row][col + 1].isMine) {
      grid[row][col + 1].isMine = false;
    }
    //Diagonals
    if (row > 0 && col > 0 && grid[row - 1][col - 1].isMine) {
      grid[row - 1][col - 1].isMine = false;
    }
    if (row < 24 && col > 0 && grid[row + 1][col - 1].isMine) {
      grid[row + 1][col - 1].isMine = false;
    }
    if (row > 0 && col < 39 && grid[row - 1][col + 1].isMine) {
      grid[row - 1][col + 1].isMine = false;
    }
    if (row < 24 && col < 39 && grid[row + 1][col + 1].isMine) {
      grid[row + 1][col + 1].isMine = false;
    }
    this.state.totNumMines = this.findTotalMines(grid);
    counter.textContent = `${this.state.totNumMines}`;
  }

  /**
   * Flags an unexplored node
   * @param {row of right clicked node} row
   * @param {column of right clicked node} col
   */
  handleContextMenu(row, col) {
    const { grid } = this.state;
    const counter = document.getElementById("counter");
    if (!grid[row][col].isVisited && !grid[row][col].isFlagged) {
      grid[row][col].isFlagged = true;
      document.getElementById(`node-${row}-${col}`).classList =
        "node node-flagged";

      counter.textContent = `${counter.textContent - 1}`;
      if (grid[row][col].isMine) this.state.minesFlagged++;
      if (
        this.state.minesFlagged === this.state.totNumMines &&
        counter.textContent >= 0
      )
        setTimeout(() => this.win(), 350);
    } else if (
      document.getElementById(`node-${row}-${col}`).classList.value ===
      "node node-flagged"
    ) {
      grid[row][col].isFlagged = false;
      document
        .getElementById(`node-${row}-${col}`)
        .classList.remove("node-flagged");

      counter.textContent = `${parseInt(counter.textContent) + 1}`;
      if (grid[row][col].isMine) this.state.minesFlagged--;
      if (
        this.state.minesFlagged === this.state.totNumMines &&
        counter.textContent >= 0
      )
        setTimeout(() => this.win(), 350);
    }
  }

  /**
   * Returns the total number of mines on the board
   * @param {The Minesweeper grid} grid
   */
  findTotalMines(grid) {
    let tot = 0;
    grid.map((row, rowIdx) => {
      row.map((col, colIdx) => {
        if (grid[rowIdx][colIdx].isMine) tot++;
      });
    });
    return tot;
  }

  startCount() {
    window.timer = setInterval(() => {
      this.state.count = this.state.count + 1;
      document.getElementById("time").innerText = this.state.count;
    }, 1000);
  }

  stopCount() {
    clearInterval(window.timer);
  }

  win() {
    this.stopCount();
    clearInterval(window.solverTimer);
    alert('You Win!\nThis page will refresh shortly after you press "OK"');
    setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  lose() {
    this.stopCount();
    clearInterval(window.solverTimer);
    alert('You Lose!\nThis page will refresh shortly after you press "OK"');
    setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  render() {
    const grid = getInitialGrid();
    const tot = this.findTotalMines(grid);
    this.state.grid = grid;
    this.state.totNumMines = tot;
    return (
      <div className="board">
        <div id="info-div">
          <table id="info">
            <th id="time">0</th>
            <th>
              <button
                id="reset"
                onClick={() => window.location.reload()}
              ></button>
            </th>
            <th>
              <button
                id="bot"
                onClick={() => {
                  window.solverTimer = setInterval(() => this.solve(), 500);
                }}
              ></button>
            </th>
            <th id="counter">{tot}</th>
          </table>
        </div>

        {grid.map((row, rowIdx) => {
          return (
            <div className="board-row">
              {row.map((col, colIdx) => {
                return (
                  <Node
                    row={rowIdx}
                    col={colIdx}
                    onClick={() => this.handleClick(rowIdx, colIdx)}
                    onContextMenu={() => this.handleContextMenu(rowIdx, colIdx)}
                    isMine={col.isMine}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  //

  /**
   * An "algorithm" that solves minesweeper (Sometimes there is no logical solution, though)
   * @param {Maximum row} maxRow
   * @param {Maximum column} maxCol
   */
  solve() {
    if (this.state.clickCount == 0) this.getInitialPoints();
    const { grid } = this.state;
    grid.map((r, rInd) => {
      r.map((c, cInd) => {
        if (!grid[rInd][cInd].isVisited);
        else if (
          grid[rInd][cInd].isVisited &&
          !grid[rInd][cInd].isFlagged &&
          this.getSurroundingNodes(rInd, cInd).length ===
            this.getNumSurrMines(rInd, cInd) &&
          this.getSurroundingNodes(rInd, cInd).length > 0
        ) {
          this.getSurroundingNodes(rInd, cInd).forEach(element => {
            if (
              !grid[element[0]][element[1]].isVisited &&
              !grid[element[0]][element[1]].isFlagged
            ) {
              this.handleContextMenu(element[0], element[1]);
            }
          });
        } else if (
          grid[rInd][cInd].isVisited &&
          !grid[rInd][cInd].isFlagged &&
          this.getSurroundingNodes(rInd, cInd).length >
            this.getNumSurroundingFlagged(rInd, cInd) &&
          this.getNumSurroundingFlagged(rInd, cInd) ==
            this.getNumSurrMines(rInd, cInd)
        ) {
          this.getSurroundingNodes(rInd, cInd).forEach(element => {
            if (
              !grid[element[0]][element[1]].isFlagged &&
              !grid[element[0]][element[1]].isVisited
            ) {
              this.handleClick(element[0], element[1]);
            }
          });
        }
      });
    });
  }

  getSurroundingNodes(row, col) {
    let nodes = [];
    if (row > 0 && !this.state.grid[row - 1][col].isVisited)
      nodes.push([row - 1, col]);
    if (row < 24 && !this.state.grid[row + 1][col].isVisited)
      nodes.push([row + 1, col]);
    if (col > 0 && !this.state.grid[row][col - 1].isVisited)
      nodes.push([row, col - 1]);
    if (col < 39 && !this.state.grid[row][col + 1].isVisited)
      nodes.push([row, col + 1]);
    if (row > 0 && col > 0 && !this.state.grid[row - 1][col - 1].isVisited)
      nodes.push([row - 1, col - 1]);
    if (row < 24 && col > 0 && !this.state.grid[row + 1][col - 1].isVisited)
      nodes.push([row + 1, col - 1]);
    if (row > 0 && col < 39 && !this.state.grid[row - 1][col + 1].isVisited)
      nodes.push([row - 1, col + 1]);
    if (row < 24 && col < 39 && !this.state.grid[row + 1][col + 1].isVisited)
      nodes.push([row + 1, col + 1]);
    return nodes;
  }

  getNumSurroundingFlagged(row, col) {
    let num = 0;
    if (row > 0 && this.state.grid[row - 1][col].isFlagged) num++;
    if (row < 24 && this.state.grid[row + 1][col].isFlagged) num++;
    if (col > 0 && this.state.grid[row][col - 1].isFlagged) num++;
    if (col < 39 && this.state.grid[row][col + 1].isFlagged) num++;
    if (row > 0 && col > 0 && this.state.grid[row - 1][col - 1].isFlagged)
      num++;
    if (row < 24 && col > 0 && this.state.grid[row + 1][col - 1].isFlagged)
      num++;
    if (row > 0 && col < 39 && this.state.grid[row - 1][col + 1].isFlagged)
      num++;
    if (row < 24 && col < 39 && this.state.grid[row + 1][col + 1].isFlagged)
      num++;
    return num;
  }

  getInitialPoints() {
    const { grid } = this.state;
    this.handleClick(12, 20);
    const initialPnts = [];
    setTimeout(() => {
      grid.map((r, rInd) => {
        r.map((c, cInd) => {
          if (grid[rInd][cInd].isVisited) {
            initialPnts.push({
              row: rInd,
              col: cInd,
              isFlagged: false,
              isVisited: true,
              numSurr: this.getNumSurrMines(rInd, cInd)
            });
          }
        });
      });
    }, 50);
    return initialPnts;
  }
}

/**
 * Returns a grid full of nodes
 */
function getInitialGrid() {
  const grid = [];
  for (let i = 0; i < 25; i++) {
    const children = [];
    for (let k = 0; k < 40; k++) {
      children.push(createNode(i, k));
    }
    grid.push(children);
  }
  return grid;
}

/**
 * Creates a node with a unique row and column, makes it unvisited, and determines whether or not it is a mine
 * @param {row of node} row
 * @param {column of node} col
 */
const createNode = (row, col) => {
  return {
    row,
    col,
    isMine: Math.random() < 0.12,
    isVisited: false,
    isFlagged: false
  };
};

export default Board;
