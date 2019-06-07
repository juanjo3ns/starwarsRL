# Star Wars - Reinforcement Learning - [DEMO](https://juanjo3ns.github.io/starwarsRL/)
![Hits](https://hitcounter.pythonanywhere.com/count/tag.svg?url=https%3A%2F%2Fgithub.com%2Fjuanjo3ns%2FstarwarsRL)

  ![Demo screenshot](https://user-images.githubusercontent.com/16901615/58427541-32fbdb80-80a0-11e9-9c91-bbee5a78d664.png)


##  1. Motivation
Two months ago [@enric1994](https://github.com/enric1994) and myself [@juanjo3ns](https://github.com/juanjo3ns) started learning Reinforcement Learning. To do so, we picked the simplest and most common environment to begin in this topic, the grid world. This simple game is recommended and heavily used by the Sutton and Barto book and the lectures from DeepMind at UCL. 

There are three different types of cells in the board: the init state, the terminal state and the 'lava' state. The Agent has to learn how to go from the init state (which is randomly initialized) to the terminal state, avoiding the 'lava' states since the agent gets a lower reward when it goes through them. After trying many different algorithms and just seeing our results in the terminal and tensorboard, we decided to create a little demo to show in a fancier way what we have learnt. That's how we came up with the idea of mapping the grid world to the death star and show the planets as the terminal states. Althought there's a couple of constraints that we'll explain latter.



##  2. Algorithms
We started with the different variants in Dynamic Programming such as Policy Evaluation, Policy Iteration and Value Iteration, then we moved to the Ɛ-greedy policies in Montecarlo and Time-Difference algorithms. In order to get a deep understanding of how Time-Difference algorithms work, we tried almost all the different implementations: Sarsa, Q-Learning, Double Q-Learning, n-step Q-Learning, DynaQ-Learning. This helped us when we had to include Neural Networks to the process. In the DQN implementation the main difference with Q-Learning is that instead of having a map of all the state-action values, we have a function approximator which in our case is a very simple NN. We also added a Replay buffer and a target network which are common techniques widely used in DQN. Finally, the particular implementation that we used for our death star is the Dueling DQN. As you can see in the picture below, the neural network outputs the same as always, the q-values. But, instead of estimate these values directly with a single stream, what we have is the value and the advantage streams sharing a convolutional encoder and merged by a special aggregator. This approach has the benefit that can learn which states are (or are not) valuable, without having to learn the effect of each action for each state. This is particularly useful in states where its actions do not affect the environment in any relevant way.
![Dueling DQN Architecture](https://user-images.githubusercontent.com/16901615/58418557-574bbe00-8088-11e9-879a-3bc37e7e841b.png)
![Q values function](https://user-images.githubusercontent.com/16901615/58418568-5dda3580-8088-11e9-8c85-5c5708826f41.png)
![Target values](https://user-images.githubusercontent.com/16901615/58425154-69822800-8099-11e9-8f82-cc3ffd3483bd.png)
![Parameters update](https://user-images.githubusercontent.com/16901615/58425598-78b5a580-809a-11e9-928e-e564cec197b2.png)


As we can see in the plots from tensorboard, the Dueling network converges a bit earlier.

Legend:
* Grey: Dueling DQN
* Green: Vanilla DQN
* Orange: Double DQN

![totalreward](https://user-images.githubusercontent.com/16901615/58426311-60df2100-809c-11e9-95e0-a560c7914880.png)
![movements](https://user-images.githubusercontent.com/16901615/58426309-60df2100-809c-11e9-9f6c-b5991426fe38.png)
![loss](https://user-images.githubusercontent.com/16901615/58426308-60df2100-809c-11e9-9d9b-04d7b212ca88.png)



##  3. 3D Modeling
![Mapping of grid world to sphere.](https://user-images.githubusercontent.com/16901615/58416457-edc8b100-8081-11e9-8737-a19ea921cd8d.png)

To make this problem more attractive, we decided to map the 2D board into a 3D sphere using the three JS framework and the Github Pages. As you can see in the image above, this mapping is like using the Mercator's Projection but the other way around. This mapping arises one problem: let's say the init state is in the (0,9) coordinates and the final state is in the (0,4). In the sphere it'd look like both positions are next to each other because they are in the north pole of the sphere, but the agent would actually have to make 5 steps in order to get to the final state. In practice this can seem confusing. 

Another problem is that our terminal state is fixed, it gets more difficult to train an agent to find the optimal path to a final state that keeps changing all the time. So the representation of the planet (terminal state) would be very static, to fix this we decided to rotate all the environment randomly for each episode. The terminal state keeps fixed all the time but the init state is different every time. 

This is actually a representation of our evaluations over different epochs of the training, where in each epoch we saved the stats an create a csv file of a couple of episodes. Then from the javascript we read and represent this csv files that include the stats in the first line and the coordinates of the agent.
