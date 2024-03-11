import { Enum } from '../enum/enum';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const initialBoard = Array.from({ length: 9 }, () => 'E');

export const START_GAME = 'Start New Game';
export const LOG_OUT = 'Logout';
export const CHOOSE_DIFFICULTY_LEVEL = 'Choose Difficulty Level';
export const EASY = 'Easy';
export const MEDIUM = 'Medium';
export const HARD = 'Hard';
export const WINNER = 'Winner :';
export const MATCH_DRAW = 'Draw';
export const GAME_RESTART = 'Game restart in : ';
export const TURN = 'Turn :';
export const SIGN_IN = 'Sign in';
export const SIGN_UP = 'Sign up';
export const YOUR_EMAIL = 'Your Email';
export const YOUR_PASSWORD = 'Your Password';
export const PLEASE_ENTER_USER_NAME = 'Enter your User name';
export const PLEASE_ENTER_EMAIL = 'Enter your Email';
export const PLEASE_ENTER_PASSWORD = 'Enter your Email';
export const HAVE_ACCOUNT = 'Don’t you have an account?';
export const ALREADY_HAVE_ACCOUNT = 'Already using Startup?';
export const CREATE_ACCOUNT = 'Create your account';
export const NAME = 'Your Name';
export const SIGN_UP_FAILED = 'Signup failed';
export const SIGN_UP_SUCCESSFUL = 'Signup successful. Login now!';
export const ERROR_DURING_SIGN_UP = 'An unexpected error occurred';
export const LOGIN_SUCCESSFUL = 'Signin successful!';
export const LOGIN_FAILED = 'Login failed';
export const CHECK_CREDENTIALS = 'Login failed. Please check your credentials.';
export const AXIOS_ERROR = 'Axios error:';
export const ERROR_IN_MAKING_MOVE = 'Error making a move:';

export const isWinnerCell = (index, latestBoard) => {
  const board = latestBoard;

  for (let i = 0; i <= 6; i += 3) {
    if (
      board[i] !== Enum.E &&
      board[i] === board[i + 1] &&
      board[i + 1] === board[i + 2]
    ) {
      return index === i || index === i + 1 || index === i + 2;
    }
  }

  for (let i = 0; i <= 2; i++) {
    if (
      board[i] !== Enum.E &&
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6]
    ) {
      return index === i || index === i + 3 || index === i + 6;
    }
  }

  for (let i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (
      board[i] !== Enum.E &&
      board[i] === board[i + j] &&
      board[i + j] === board[i + 2 * j]
    ) {
      return index === i || index === i + j || index === i + 2 * j;
    }
  }

  return false;
};
