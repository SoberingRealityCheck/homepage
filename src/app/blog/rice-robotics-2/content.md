# Project: Rice Robotics R&D (Part 2), Teaching a Cat Robot to Move a Hell of a lot Faster

[note: would like catbot.png as the ikeda image header here]

## Intro

So when our team left off at the end of semester 1, we'd sort of settled on some basic fundamentals of our tech stack (Genesis for physics simulation, rsl_rl for our reinforcement learning, some custom glue and reward function stuff using pytorch, an export pipeline to get our simulated .urdf connected live to our hardware team's Onshape design versions) and were planning to move forward to working with the real robot.

## The Real Robot!

This is when we finally get a chance to tie into the central thesis of this whole project. 

Some context here: this project actually began as just a leg, developed prior to my arrival on the team by a set of mechanical engineers. The leg is a 4-bar linkage design, and brings a whole set of interesting mechanical tradeoffs that make it well-suited for agile jumping movement but substantially more difficult to solve the inverse kinematics for. Suffice it to say - it's mechanically fantastic for our use case but complex enough we were having a hard time controlling it. That's where our neural net research comes in clutch.

"Catbot" had a finalized rough design around december, meaning we could finally import it into the sim and get a look at what we were working with.
[image of the catbot in genesis, caption: "now this is a real robot..."]

as you can see here, it's using that four-bar linkage system on each leg. Each leg is a 3DOF system driven by three actuators. Time to get to work! 

## Challenge 1: Simulating Linkages

First problem we ran into with the sim was that URDF files(the way we represent the robot in the simualtion) are fundamentally structured in a way that makes it pretty damn hard to simulate these legs. URDF files are structured like a tree, and these legs are closed loops (and these loops are the most important part of the whole sim!). We first tried a bit of a hack: writing out most of the catbot as a URDF tree (leaving some pieces still disconnected), and then closing the loops ourselves within the physics sim by creating a force that specifically yanks together those disconnected parts every step to sort of approximate what it would be like if they were connected. This... sort of worked, but led to pretty inconsistent behavior, weird strain on the simulated robot, and an overall feeling that this was a stupid solution to an avoidable problem. So we just switched the file format for the robot to XML, which supported closed loops a bit easier. 

[gif of the catbot in sim with the minecraft background; caption: "sim up and running, with a fresh coat of paint :)" ]

## Challenge 2: Formalizing "Cat" - Reward Function Research

Back to the core challenge of machine learning! How do we actually incentivize / represent 'catlike' movement mathematically?? This is really fun. 

We took a ton of early guidance from these three papers:

- MIT Mini Cheetah RL: https://agility.csail.mit.edu/
- Energy Efficiency reward leading to RL Gait Emergence: https://arxiv.org/pdf/2111.01674
- Enforcing Compliance Limits: https://arxiv.org/abs/2510.10759

The Fu, Kumar, Malik, Pathak paper was by far my favorite - their super cool realization in that paper was that giving an energy efficiency incentive to a robot allowed it to sort of figure out the phenomenon of "walking" / "trotting" / "running" without needing to be given explicit direction on each different pattern of movement. Obviously this is sort of how real animals figured it out too, darwinist evolution incentivized energy efficient movement which 

## Challenge 3: Machine Learning Pitfalls

## Presenting @ 2026 Huff OEDK Engineering Showcase!