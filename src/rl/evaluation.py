import torch
import os
import sys
import numpy as np
from time import sleep
from IPython import embed
from src.rl.General.Board import Board
from src.rl.General.NN import QNet, DuelingNet
from src.utils.writecsv import CSV

path = 'weights/'
assert len(sys.argv)>1, "Introduce model version"
assert os.path.exists(os.path.join(path,sys.argv[1])),"Path doesn't exist"
vpath = os.path.join(path, sys.argv[1])


''' We'll be able to evaluate just one iteration of model's weights, or
	all the different iterations trained
'''
if len(sys.argv)>2:
	iterations = [sys.argv[2]]
else:
	iterations = os.listdir(vpath)
	iterations.sort(key=lambda x: int(x.split('.')[0]))
print(iterations)
board = Board()
if 'dueling' in sys.argv[1]:
	Q = DuelingNet(board)
else:
	Q = QNet(board)

def eval_step(q_fn, state):
	board_state = torch.from_numpy(board.getEnvironment(state).astype(np.float32)).type(dtype)
	q_values = q_fn.predict(board_state.unsqueeze(0))
	return board.actions[q_values.max(1)[1][0]]

for it in iterations:

	''' WRITE ALL STEPS AND TERMINAL STATES INTO THE CSV '''
	csv = CSV("coords_{}".format(it.split('.')[0]), sys.argv[1])

	weights = torch.load(os.path.join(vpath, it))
	Q.load_state_dict(weights)
	dtype = torch.cuda.FloatTensor if torch.cuda.is_available() else torch.FloatTensor
	Q = Q.type(dtype)

	num_episodes = 50
	lost = 0
	mvs = []
	rwr = []
	total_coords = []

	for i in range(num_episodes):
		initState = board.resetInitRandomly()
		total_coords.append([initState,board.terminalState])
		done = False
		while not done:
			# board.printBoard(initState)
			action = eval_step(Q,initState)
			reward, nextState, done = board.takeAction(initState, action)
			total_coords.append([nextState,board.terminalState])
			initState = nextState
			if board.movements > board.maxSteps:
				lost += 1
				break
		mvs.append(board.movements)
		rwr.append(board.totalreward)

	avg_mvs = sum(mvs)/num_episodes
	avg_rwr = sum(rwr)/num_episodes
	message = "ITERATION: {}\nVICTORIES: {}\nDEFEATS: {}\nAVERAGE REWARD: {}\nAVERAGE MOVEMENTS: {}".format(it,(num_episodes-lost), lost, avg_rwr, avg_mvs)
	print(message)

	csv.write([it.split('.')[0],(num_episodes-lost)/num_episodes*100],[round(avg_rwr,2),avg_mvs])
	for st in total_coords:
		csv.write(st[0],st[1])
	csv.close()
