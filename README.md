# Minesweeper
Created entirely by Chris Pittman

This is a Minesweeper remake, programmed in React.

By no means is the code optimal (Far from it), but it works for the most part.

One key difference between this and the real game is that all mines must be flagged to win. This can be done by right clicking a node. To unflag, right click again.

As an addition, this program has a built in solving algorithm should you get bored while playing. Just press the button with a robot on it to begin. Once the algorithm has started, it cannot be stopped, unless it gets stuck due to a logic failure (Forced 50/50 guess).

You can play it at here at https://codesandbox.io/s/friendly-brattain-2udjn (I suggest opening it in a new tab so it fits the entire screen). Because Code Sandbox caused some issues with the game, a few changes were made on the files in the link (The Github files are still the same):
  1. The timer was removed (Lag made the timer go haywire)
  2. The speed at which a node with no mines surrounding it is clicked was lowered (To avoid the stack call limit)
  3. The algorithm's speed was lowered (To avoid the stack call limit)
