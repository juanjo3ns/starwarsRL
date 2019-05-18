import numpy as np
from collections import defaultdict
from random import randint


class Buffer:
    def __init__(self, size, batch_size):
        self.buffer_size = size
        self.buffer_data = defaultdict(list)
        self.batch_size = batch_size

    def store(self, step):
        for i, s in enumerate(self.buffer_data.keys()):
            if len(self.buffer_data[s]) > self.buffer_size:
                self.buffer_data[s].pop(0)
        self.buffer_data['state'].append(step[0])
        self.buffer_data['action'].append(step[1])
        self.buffer_data['next_state'].append(step[2])
        self.buffer_data['reward'].append(step[3])
        self.buffer_data['done'].append(step[4])

    def sample(self):
        sample_data = defaultdict(list)

        for s in range(min(self.batch_size, len(self.buffer_data['state']))):
            sample_num = randint(0, len(self.buffer_data['state']) - 1)
            for key in self.buffer_data.keys():
                sample_data[key].append(self.buffer_data[key][sample_num])

        return sample_data
