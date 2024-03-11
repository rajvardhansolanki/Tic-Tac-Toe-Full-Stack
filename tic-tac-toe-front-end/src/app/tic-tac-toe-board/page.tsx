'use client';

import {
  AXIOS_ERROR,
  BASE_URL,
  CHOOSE_DIFFICULTY_LEVEL,
  EASY,
  ERROR_IN_MAKING_MOVE,
  GAME_RESTART,
  HARD,
  LOG_OUT,
  MATCH_DRAW,
  MEDIUM,
  START_GAME,
  initialBoard,
  isWinnerCell,
} from '@/utils/common/common';
import { Enum } from '@/utils/enum/enum';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const Game = () => {
  const router = useRouter();
  const [boardData, setBoardData] = useState(initialBoard);
  const [isComplete, setIsComplete] = useState(false);
  const [turn] = useState(Enum.X);
  const [level, setLevel] = useState();
  const [winner, setWinner] = useState(null);
  const [userId, setUserId] = useState('');
  const [gameId, setGameId] = useState('');
  const [countDown, setCountDown] = useState(3);

  const getBoard = async (id: string) => {
    if (id) {
      try {
        const response = await axios.get(
          `${BASE_URL}/tic-tac-toe/get-board-data/${id}`,
        );
        const data = response.data;
        setBoardData(data?.board || Array(9).fill('E'));
        setLevel(data?.difficultyLevel);
        setGameId(data?.gameId);
        setIsComplete(data?.complete);
      } catch (error) {
        console.error(AXIOS_ERROR, error);
      }
    }
  };

  const performMove = async (cellIndex: number) => {
    const requestBody = {
      userId: userId,
      gameid: gameId || null,
      cellindex: cellIndex,
      difficultylevel: level,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/tic-tac-toe/game`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;
      setIsComplete(data.complete);
      setGameId(data.gameId);
      setWinner(data.winner);
      getBoard(userId);
    } catch (error) {
      console.error(ERROR_IN_MAKING_MOVE, error);
    }
  };

  const startGame = useCallback(async (userId: string) => {
    setLevel(null);
    const requestBody = {
      userId: userId,
      gameid: null,
      cellindex: null,
      difficultylevel: null,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/tic-tac-toe/game`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;
      setGameId(data.gameId);
      getBoard(userId);
      setWinner(null)
      setCountDown(3)
    } catch (error) {
      console.error(ERROR_IN_MAKING_MOVE, error);
    }
  }, []);

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/sign-in');
  };

  useEffect(() => {
    getBoard(userId);
  }, [userId]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
  }, []);

  useEffect(() => {
    let countdownTimer;

    if (isComplete && countDown > 0) {
      countdownTimer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }

    if (countDown === 0) {
      startGame(userId);
      setCountDown(3);
    }

    return () => {
      clearTimeout(countdownTimer);
    };
  }, [countDown, isComplete, userId, startGame]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h4 className="my-4 text-2xl font-bold">
        {level && (winner ? `Winner: ${winner}` : `Turn: ${turn}`)}
      </h4>
      <h4 className="my-4 text-2xl">
        {isComplete ? `${GAME_RESTART} ${countDown}` : ''}
      </h4>
      <h4 className="my-4 text-2xl font-bold">
        {isComplete && winner === null ? `${MATCH_DRAW}` : ''}
      </h4>
      <div className="grid grid-cols-3 gap-5">
        {level &&
          boardData?.map((cell, index) => (
            <button
              key={index}
              className={`h-20 w-20 border-2 border-gray-300 text-2xl ${isWinnerCell(index, boardData) ? 'bg-blue-400' : ''
              }`}
              onClick={() => performMove(index)}
            >
              {cell === Enum.E ? '' : cell}
            </button>
          ))}
      </div>
      {!level ? (
        <div className="w-72">
          <label className="text-white-700 my-4 block">
            {CHOOSE_DIFFICULTY_LEVEL}
          </label>
          <select
            id="small"
            className="block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={level}
            onChange={handleLevelChange}
          >
            <option value=""></option>
            <option value="easy">{EASY}</option>
            <option value="medium">{MEDIUM}</option>
            <option value="hard">{HARD}</option>
          </select>
        </div>
      ) : (
        <div></div>
      )}

      <div className="mx-auto mt-6 flex w-72 justify-between">
        {level ? (
          <button
            className={`rounded px-4 py-2 text-white ${level === null ? 'bg-blue-400' : 'bg-blue-700'}`}
            disabled={level === null}
            onClick={() => startGame(userId)}
          >
            {START_GAME}
          </button>
        ) : (
          <div></div>
        )}
        <button
          className={`rounded bg-red-500 px-4 py-2 text-white ${!level ? 'w-full' : ''}`}
          onClick={handleLogout}
        >
          {LOG_OUT}
        </button>
      </div>
    </div>
  );
};

export default Game;
