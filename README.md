# Star Wars - Reinforcement Learning - [DEMO](https://juanjo3ns.github.io/starwars-RL/)
##  1. Motivation
Two months ago @enric1994 and myself @juanjo3ns started learning Reinforcement Learning. To do so, we picked the simplest and most common environment to begin in this topic, the grid world. This simple game is recommended and heavily used by the Sutton and Barto book and the lectures from DeepMind at UCL. 

There are three different types of cells in the board: the init state, the terminal state and the 'lava' state. The Agent has to learn how to go from the init state (which is randomly initialized) to the terminal state, avoiding the 'lava' states since the agent gets a lower reward when it goes through them. After trying many different algorithms and just seeing our results in the terminal and tensorboard, we decided to create a little demo to show in a fancier way what we have learnt. That's how we came up with the idea of mapping the grid world to the death star and show the planets as the terminal states. Althought there's a couple of constraints that we'll explain latter.



##  2. Algorithms
We started with the different variants in Dynamic Programming such as Policy Evaluation, Policy Iteration and Value Iteration, then we moved to the Ɛ-greedy policies in Montecarlo and Time-Difference algorithms. In order to get a deep understanding of how Time-Difference algorithms' work we tried almost all the different implementations: Sarsa, Q-Learning, Double Q-Learning, n-step Q-Learning, DynaQ-Learning. This helped us when we had to include Neural Networks to the process. In the DQN implementation the main difference with Q-Learning is that instead of having a map of all the state-action values, we have a function approximator which in our case is a very simple NN. We also added a Replay buffer and a target network which are common techniques widely used in DQN. Finally, the particular implementation that we used for our death star is the Dueling DQN. As you can see in the picture below, the neural network outputs the same as always, the q-values. But, instead of estimate these values directly with a single stream, what we have is the value and the advantage streams sharing a convolutional encoder and merged by a special aggregator. This approach has the benefit that can learn which states are (or are not) valuable, without having to learn the effect of each action for each state. This is particularly useful in states where its actions do not affect the environment in any relevant way.
![Dueling DQN Architecture](https://user-images.githubusercontent.com/16901615/58418557-574bbe00-8088-11e9-879a-3bc37e7e841b.png)
![Q values function](https://user-images.githubusercontent.com/16901615/58418568-5dda3580-8088-11e9-8c85-5c5708826f41.png)


##  3. 3D Modeling
![Mapping of grid world to sphere.](https://user-images.githubusercontent.com/16901615/58416457-edc8b100-8081-11e9-8737-a19ea921cd8d.png)
