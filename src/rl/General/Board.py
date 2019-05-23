import os
import numpy as np
import random
from tqdm import tqdm
from IPython import embed
from collections import defaultdict
from random import choice
from tensorboard_logger import configure, log_value, log_histogram
from src.rl.General.lava import *


class Board:
	def __init__(self,
				 epsilon_scheduled=0,
				 board_size=10,
				 algorithm='sarsa',
				 plotBool=[False, False],
				 exp=4,
				 changeExp=None,
				 nstep=1):

		self.rewardSize = -0.04
		self.reward_lava = -1
		self.totalreward = 0
		self.movements = 0
		self.gamma = 0.99
		self.alpha = 0.1
		self.alpha_nn = 0.0001
		self.epsilon = 0.1
		self.numIterations = 30000
		self.changeIteration = 2500
		self.maxSteps = 50
		self.plotStep = 50

		self.actions = [(-1, 0), (1, 0), (0, 1), (0, -1)]
		self.gridSize = board_size
		self.epsilon_scheduled = epsilon_scheduled
		self.algorithm = algorithm
		self.exp = exp
		self.changeExp = changeExp

		# DQN parameters
		self.start_learning = 50
		self.target_update_freq = 1
		self.learning_freq = 1
		self.batch_size = 1
		self.loss_list = []

		# Dyna Q
		self.planning_steps = [0, 5, 10, 50, 100]

		# n-step Q-Learning and DQN
		self.nstep = nstep

		# Lists or dictionaries
		self.states = [[i, j] for i in range(self.gridSize) for j in range(self.gridSize)]
		self.count = defaultdict(int)
		self.policy = defaultdict(lambda: np.ones(
			len(self.actions)) / len(self.actions))
		self.model = defaultdict(defaultdict)
		self.Q = defaultdict(lambda: np.zeros(len(self.actions)))
		# Double Q-Learning
		self.doubleQ = defaultdict(lambda: np.zeros(len(self.actions)))
		self.V = np.zeros((self.gridSize, self.gridSize))
		self.board = np.zeros((self.gridSize, self.gridSize))
		# Walls of grid world
		self.lava = []
		self.setLava(self.exp)
		self.terminalState = getEnv(self.exp, self.gridSize)["terminalState"]
		self.initState = self.resetInit()

	def changeExperiment(self, it):
		if not self.changeExp == None:
			if it == self.changeIteration:
				self.setLava(self.changeExp)

	def resetInit(self):
		self.totalreward = 0
		self.movements = 0
		return getEnv(self.exp, self.gridSize)["initState"]

	def resetInitRandomly(self):
		self.totalreward = 0
		self.movements = 0
		# Initialize initState to terminal state to make sure we enter the while
		initState = self.terminalState
		while initState == self.terminalState:
			initState = (random.randint(0, self.gridSize-1),random.randint(0, self.gridSize-1))
		return tuple(initState)

	def resetTerminalRandomly(self):
		self.terminalState = (random.randint(0, self.gridSize-1),random.randint(0, self.gridSize-1))

	def setLava(self, exp):
		cells = []
		for lava_group in getEnv(exp, self.gridSize)["lava"]:
			for l in lava_group:
				cells.append(l)
		self.lava = cells

	def takeAction(self, state, action):
		nextState = np.array(state) + np.array(action)
		done = False
		reward = self.rewardSize
		if -1 in list(nextState) or self.gridSize in list(nextState):
			nextState = state

		if list(nextState) in self.lava:
			reward = self.reward_lava

		if tuple(nextState) == self.terminalState:
			reward = 0
			done = True

		self.totalreward += reward
		self.movements += 1
		return reward, tuple(nextState), done

	def getAction(self, state):
		return self.actions[np.random.choice(range(len(self.actions)), p=self.policy[state])]

	def policy_fn(self, state, Q_state):
		nA = len(self.actions)
		# 1 / epsilon for non-greedy actions
		self.policy[state] = (self.epsilon / nA) * np.ones(nA)
		greedy_action = Q_state.argmax()
		# (1 / epsilon + (1 - epsilon)) for greedy action
		self.policy[state][greedy_action] = 1.0 - \
			self.epsilon + (self.epsilon / nA)

	def getAgent(self, state):
		board = np.zeros((self.gridSize, self.gridSize))
		board[state[0]][state[1]] = 1
		return board

	def getLava(self):
		board = np.zeros((self.gridSize, self.gridSize))
		for state in self.lava:
			board[state[0]][state[1]] = 1
		return board

	def getTerminalState(self):
		board = np.zeros((self.gridSize, self.gridSize))
		board[self.terminalState[0]][self.terminalState[1]] = 1
		return board

	def getEnvironment(self, state):
		agent = self.getAgent(state)
		lava = self.getLava()
		terminalStates = self.getTerminalState()

		return np.stack((agent, terminalStates))

	def printBoard(self, state):
		board = np.zeros((self.gridSize, self.gridSize))
		board[state[0]][state[1]] = 1
		print(board)
