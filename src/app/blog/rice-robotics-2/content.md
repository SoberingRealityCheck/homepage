# Project: Rice Robotics R&D (Part 2), Teaching a Cat Robot to Move a Hell of a lot Faster

[note: would like catbot.png as the ikeda image header here]

## Intro

So when our team left off at the end of semester 1, we'd sort of settled on some basic fundamentals of our tech stack (Genesis for physics simulation, rsl_rl for our reinforcement learning, some custom glue and reward function stuff using pytorch, an export pipeline to get our simulated .urdf connected live to our hardware team's Onshape design versions) in the context of the fairly-rudimentary "Servobot" prototype, and were planning to move forward to working with the full cat robot as soon as we could. Semester 2 started fairly strong with the mechanical team granting us access to our first full designs of the real robot.

## The Real Robot!

This is when we finally get a chance to tie into the central thesis of this whole project. 

Some context here: this project actually began as just a leg, developed prior to my arrival on the team by a set of mechanical engineers. The leg is a fairly complex 4-bar linkage design, and brings a whole set of interesting mechanical tradeoffs that make it well-suited for agile jumping movement but substantially more difficult to solve the inverse kinematics for. Suffice it to say - it's mechanically fantastic and super advantageous for our use case, but mathematically annoying enough we were having a hard time controlling it. That's where my neural net research comes in handy! Our plan was to simply see if we could get a computer to figure out how to drive.

"Catbot" had a finalized rough design around december, meaning we could finally import it into the sim and get a look at what we were working with.
[image of the catbot in genesis, caption: "now this is a real robot..."]

as you can see here, it's using that four-bar linkage system on each leg. Each leg is a 3DOF system driven by three actuators. Unlike servobot, we also had access to a fair bit more data here: these are some much fancier AKE60-8 KV80 actuators connected over CAN for bidirectional communication, meaning we could simultaneously drive them and also read position data from their built-in encoders. So catbot was still fairly blind, but was at the very least capable of knowing where its legs were in space (and a platform that was built with further sensor integration in mind from the get-go, so the software team wasn't quite stuck trying to teach a robot how to deal with "flying blind" anymore!).

[video: catbot assembled.webm]

## Challenge 1: Simulating Linkages

First problem we ran into with the sim was that URDF files(the way we represent the robot in the simualtion) are fundamentally structured in a way that makes it pretty damn hard to simulate these legs. URDF files are structured like a tree, and these legs are closed loops (and these loops are the most important part of the whole sim!). We first tried a bit of a hack: writing out most of the catbot as a URDF tree (leaving some pieces still disconnected), and then closing the loops ourselves within the physics sim by creating a force that specifically yanks together those disconnected parts every step to sort of approximate what it would be like if they were connected. This... sort of worked, but led to pretty inconsistent behavior, weird strain on the simulated robot, and an overall feeling that this was a stupid solution to an avoidable problem. So we just switched the file format for the robot to XML, which supported closed loops a bit easier. 

[gif of the catbot in sim with the minecraft background; caption: "sim up and running, with a perhaps-familiar coat of paint :)" ]

## Challenge 2: Formalizing "Cat" - Reward Function Research

Back to the core challenge of machine learning! How do we actually incentivize / represent 'catlike' movement mathematically?? This is really fun. 

We took a ton of early guidance from these three papers:

- MIT Mini Cheetah RL: https://agility.csail.mit.edu/
- Energy Efficiency reward leading to RL Gait Emergence: https://arxiv.org/pdf/2111.01674
- Enforcing Compliance Limits: https://arxiv.org/abs/2510.10759

Like I mentioned in the earlier part 1, the Fu, Kumar, Malik, Pathak paper was by far my favorite - their super cool realization in that paper was that giving an energy efficiency incentive to a robot allowed it to sort of figure out the phenomenon of "walking" / "trotting" / "running" without needing to be given explicit direction on each different pattern of movement. Obviously this is sort of how real animals figured it out too, darwinist evolution incentivized energy efficient movement which is why everything with legs has figured out how to solve this problem. But it was particularly cool to see both our Servobot and later our Catbot tests learn this from first principles! 



[video: catbot_pack.webm]

One of the other fundamental puzzles I ran into over the course of designing a training curriculum for the robot was figuring out how to adjust training weights to incentivize exploration, like I wanted the robot to be capable of trying new approaches and being rewarded for clever solutions, but still making sure it was capable of exercising caution by the time we exported it. This ended up being a sizeable chunk of our development time... by the end of a couple months of testing, we'd landed on these distinct phases for the curriculum:

Recklessly Match Target --> Additional "Height" Target, Pickier Tracking --> Energy & Stability --> Prefer Default Pose --> Lower Command Freq --> Safety + Consistency

[image: training-phases-sim.svg]



[image: /blog/rewards/tracking_lin_vel.svg]
[image: /blog/rewards/tracking_ang_vel.svg]
[image: /blog/rewards/survival.svg]
[image: /blog/rewards/lin_vel_z.svg]
[image: /blog/rewards/roll_angle.svg]
[image: /blog/rewards/pitch_angle.svg]
[image: /blog/rewards/base_height.svg]
[image: /blog/rewards/action_rate.svg]
[image: /blog/rewards/similar_to_default_legs.svg]
[image: /blog/rewards/similar_to_default_hips.svg]
[image: /blog/rewards/energy.svg]
[image: /blog/rewards/stretching_pain.svg]
[image: /blog/rewards/hip_pain.svg]



## Challenge 3: SIM2Real Pitfalls

Our first draft of a fairly solid neural 

[Image: training-phases-sim2real.svg (diagrams of the sim2real phases of the curriculum)]

## Challenge 4: Integration & Timelines



## Presenting @ 2026 Huff OEDK Engineering Showcase!

[video: showcase_table.webm]
