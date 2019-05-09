FROM nvidia/cuda:9.0-base-ubuntu16.04

RUN apt update -y; apt install -y \
	libsm6 \
	libxext6 \
	libxrender-dev \
	python3 \
	python3-pip


ADD docker/requirements.txt .
RUN pip3 install -r requirements.txt
