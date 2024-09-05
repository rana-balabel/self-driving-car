# Self-Driving Car Simulation using JavaScript 

## Overview
This project is a self-driving car simulation created from scratch using **vanilla JavaScript**. The simulation models a simple environment where a car autonomously drives through traffic using a custom-built neural network. Key features include car driving mechanics, sensor-based environment perception, collision detection, and a neural network that learns to control the car without any pre-built libraries.

## Features
- **Car Driving Mechanics**: Basic driving logic including acceleration, braking, and steering.
- **Road and Environment Setup**: Dynamically generated roads and lanes for the car to navigate.
- **Artificial Sensor Simulation**: Simulated sensors that detect the car’s environment to feed data into the neural network.
- **Collision Detection**: The car can detect collisions with obstacles, road edges, and other vehicles.
- **Simulating Traffic**: Additional traffic vehicles are simulated to create a more realistic driving environment.
- **Neural Network Control**: A fully implemented neural network that takes sensor inputs and controls the car autonomously.
- **Parallelization**: The simulation supports parallelization for efficient processing of multiple cars.
- **Genetic Algorithm**: Used to optimize the neural network's performance by evolving better configurations over time.

## How the Neural Network Works
The neural network is built from scratch and designed to mimic basic biological neural networks. It processes inputs from simulated sensors (such as distance from obstacles) and outputs steering and acceleration commands to control the car. 

The neural network architecture includes:
- Input layer: Receives data from the car’s sensors.
- Hidden layers: Process sensor information using customizable nodes.
- Output layer: Controls the car's steering and throttle.

## Technology Stack
- **JavaScript**: The entire project is built using plain JavaScript, without any external libraries.
- **HTML5 Canvas**: Used for rendering the visual elements of the simulation.
- **Neural Networks and Genetic Algorithms**: Implemented manually to optimize the driving performance.

## Installation and Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/gniziemazity/Self-Driving-Car
   cd Self-Driving-Car
2. **Run the simulation:**:
    Open the `index.html` file in your browser, and the simulation will begin.

## How to Use
1. **Starting the Simulation:**
   - The simulation begins automatically when you open the index.html file. The car will attempt to navigate the road using its neural network.
2. **Customizing the Environment: **
   - Modify the road, car, and sensor parameters in the JavaScript files to change the road layout, car behavior, or sensor accuracy.
3. **Optimizing with Genetic Algorithms:**
   - The genetic algorithm will improve the car’s performance over time by adjusting neural network parameters through mutation and selection.
4. **Control Keys:**
   - Arrow keys can be used to manually control the car.
   - Use the console to observe the neural network’s outputs in real time.

## Credits
FreeCodeCamp's neural network courses on https://www.freecodecamp.org/, taught by Radu https://radufromfinland.com/
