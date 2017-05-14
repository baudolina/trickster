:- use_module(library(clpfd)).

sudoku(Rows) :-
  transpose(Rows, Columns),

  maplist(no_repeat, Rows),
  maplist(no_repeat, Columns),

  Rows = [A, B, C, D],
  block_no_repeat(A, B),
  block_no_repeat(C, D).

no_repeat(Vector) :-
  maplist(no_repeat_(Vector), [1, 2, 3, 4]).

no_repeat_(Vector, Num) :-
  member(Num, Vector).

block_no_repeat([], []).
block_no_repeat([N1, N2|Ns1], [N3, N4|Ns2]) :-
  no_repeat([N1, N2, N3, N4]),
  block_no_repeat(Ns1, Ns2).

problem(1, [[1, _, 2, _], [_, _, 3, 1], [_, 1, _, 2], [2, _, 1, _]]).
