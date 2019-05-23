import torch.nn as nn
import torch.nn.functional as F
from IPython import embed


class QNet(nn.Module):
	def __init__(self, board):
		super(QNet, self).__init__()

		# self.fc1 = nn.Linear(3 * board.gridSize * board.gridSize,
		# 					 5 * board.gridSize * board.gridSize)
		# self.fc2 = nn.Linear(5 * board.gridSize * board.gridSize,
		# 					 5 * board.gridSize * board.gridSize)
		# self.fc3 = nn.Linear(5 * board.gridSize * board.gridSize,
		# 					 2 * board.gridSize * board.gridSize)
		# self.fc4 = nn.Linear(2 * board.gridSize * board.gridSize, len(board.actions))
		self.fc1 = nn.Linear(2 * board.gridSize * board.gridSize,
							 5 * board.gridSize * board.gridSize)
		self.fc2 = nn.Linear(5 * board.gridSize * board.gridSize,
							 7 * board.gridSize * board.gridSize)
		self.fc3 = nn.Linear(7 * board.gridSize * board.gridSize,
							 5 * board.gridSize * board.gridSize)
		self.fc4 = nn.Linear(5 * board.gridSize * board.gridSize,
							 2 * board.gridSize * board.gridSize)
		self.fc5 = nn.Linear(2 * board.gridSize * board.gridSize, len(board.actions))

	def predict(self, x):
		(_, C, H, W) = x.data.size()
		x = x.view(-1, C * H * W)
		x = F.relu(self.fc1(x))
		x = F.relu(self.fc2(x))
		x = F.relu(self.fc3(x))
		x = F.relu(self.fc4(x))
		return self.fc5(x)

class VNet(nn.Module):
	def __init__(self, board):
		super(VNet, self).__init__()

		self.fc1 = nn.Linear(3 * board.gridSize * board.gridSize,
							 4 * board.gridSize * board.gridSize)
		self.fc2 = nn.Linear(4 * board.gridSize * board.gridSize,
							 int(board.gridSize * board.gridSize / 2))
		self.fc3 = nn.Linear(int(board.gridSize * board.gridSize / 2),
							 int(board.gridSize * board.gridSize / 4))
		self.fc4 = nn.Linear(
			int(board.gridSize * board.gridSize / 4), 1)

	def predict(self, x):
		(_, C, H, W) = x.data.size()
		x = x.view(-1, C * H * W)
		x = F.relu(self.fc1(x))
		x = F.relu(self.fc2(x))
		x = F.relu(self.fc3(x))
		return self.fc4(x)

class PolicyNet(nn.Module):
	def __init__(self, board):
		super(PolicyNet, self).__init__()

		self.fc1 = nn.Linear(3 * board.gridSize * board.gridSize,
							 4 * board.gridSize * board.gridSize)
		self.fc2 = nn.Linear(4 * board.gridSize * board.gridSize,
							 int(board.gridSize * board.gridSize / 2))
		self.fc3 = nn.Linear(int(board.gridSize * board.gridSize / 2),
							 int(board.gridSize * board.gridSize / 4))
		self.fc4 = nn.Linear(
			int(board.gridSize * board.gridSize / 4), len(board.actions))

	def predict(self, x):
		(_, C, H, W) = x.data.size()
		x = x.view(-1, C * H * W)
		x = F.relu(self.fc1(x))
		x = F.relu(self.fc2(x))
		x = F.relu(self.fc3(x))
		return F.softmax(self.fc4(x), dim=1)

class DuelingNet(nn.Module):
	def __init__(self, board):
		super(DuelingNet, self).__init__()
		self.feature = nn.Sequential(
			nn.Linear(2 * board.gridSize * board.gridSize,
					 5 * board.gridSize * board.gridSize),
			nn.ReLU()
		)

		self.advantage = nn.Sequential(
			nn.Linear(5 * board.gridSize * board.gridSize, 128),
			nn.ReLU(),
			nn.Linear(128, len(board.actions))
		)

		self.value = nn.Sequential(
			nn.Linear(5 * board.gridSize * board.gridSize, 128),
			nn.ReLU(),
			nn.Linear(128, 1)
		)
	def predict(self, x):
		(_, C, H, W) = x.data.size()
		x = x.view(-1, C * H * W)
		x = self.feature(x)
		advantage = self.advantage(x)
		value = self.value(x)
		return value + advantage  - advantage.mean()


# from Board import Board
# from random import randint
# import numpy as np
# import torch
# dtype = torch.cuda.FloatTensor if torch.cuda.is_available() else torch.FloatTensor
#
# board = Board()
# Q = NN(board)
# Q = Q.type(dtype)
#
# batch = np.array([board.getBoard((randint(0,board.gridSize-1), randint(0,board.gridSize-1))) for i in range(32)])
#
# preds = Q.predict(torch.from_numpy(batch).type(dtype))
#
# embed()
