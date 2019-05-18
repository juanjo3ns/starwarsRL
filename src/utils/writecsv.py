import csv


class CSV:
	def __init__(self,file):
		self.file = file
		self.csvfile = open(self.file + '.csv', 'w')
		self.csvwriter = csv.writer(self.csvfile, delimiter=',')

	def write(self, c1, c2):
		self.csvwriter.writerow([c1[0],c1[1],c2[0],c2[1]])
	def close(self):
		self.csvfile.close()
