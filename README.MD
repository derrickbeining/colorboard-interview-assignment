# Colorboard Game Coding Challenge

## Problem:

A simple matching game for children uses a board that is a sequence of colored
squares. Each player has a game piece. Players alternate turns, drawing cards
containing either one colored square or two colored squares of the same color. Players
move their pieces forward on the board to the next square that matches the single
color on the card or forward to the second matching square if the card contains two
colored squares, or forward to the last square on the board if there is no square
matching the description above. A player wins if his piece lands on the last square of
the board. It is possible for all the cards to be drawn and still not have a winner.
This problem represents colors with capital letters from A-Z. Below is a diagram of a
sample board.

['R', 'Y', 'G', 'P', 'B', 'R', 'Y', 'G', 'B', 'R', 'P', 'O', 'P']
 ^ Start                                                      ^ Finish

Consider the deck of cards: R, B, GG, Y, P, B, P, RR

For 3 players, the game proceeds as follows:

Player 1 draws R, moves to 1st square
Player 2 draws B, moves to 5th square
Player 3 draws GG, moves to 8th square
Player 1 draws Y, moves to 2nd square
Player 2 draws P, moves to 11th square
Player 3 draws B, moves to 9th square
Player 1 draws P, moves to 4th square
Player 2 draws RR, Wins! (no R in front of piece so it goes to last
square)

Using the same board and the same deck of cards, but with 2 players, Player 1 wins
after 7 cards. With 4 players, no one wins after exhausting the deck of 8 cards.

## Input:
Input consists of information for one or more games. Each game starts with one line
containing the number of players (1-4), the number of squares on the board (1-79),
and the number of cards in the deck (1-200). This is followed by a single line of
characters representing the colored squares on the board. Following this are the cards
in the deck, one card per line. Cards can have only a single character, or two of the
same character. The end of the input is signaled by a line with 0 for the number of
players - the other two values will be present but indeterminate.

## Output:
For each game, the output is either the winning player and the total number of cards
drawn, or the number of cards in the deck, as shown in the sample output. Always use
the plural “cards”.

## Sample Input: (Input File: colorboard.in)
2 13 8
RYGPBRYGBRPOP
R
B
GG
Y
P
B
P
RR
2 6 5
RYGRYB
R
YY
G
G
B
3 9 6
QQQQQQQQQ
Q
QQ
Q
Q
QQ
Q
0 6 0

## Sample Output: (Output File: colorboard.out)
Player 1 won after 7 cards.
Player 2 won after 4 cards.
No player won after 6 cards.

Look at the sample input and output files carefully. Your program must print
the output in the **exact same format**.
