# CDC2024
Welcome! This is the project repo for our contribution to the 2024 Carolina Data Challenge.
## The task
At CDC 2024, participants were allowed to choose from tracks centered around 5 disciplines: Business, Health Science, Social Science, Natural Science, and Pop Culture. Each track came with a data set to be analyzed and visualized. 
## Our approach
For our project, we chose to work with the [Social Science Track data set](https://archive.ics.uci.edu/dataset/485/tarvel+review+ratings), which investigates users’ ratings on attractions throughout Europe based on 24 different attributes, such as ‘beaches’ and ‘art galleries.’ We began by investigating the model through visualizations, attempting to find correlations across users and attributes.
## What we found
We expected to find relationships between certain attributes across users (i.e., did users who generally enjoyed churches tend to like museums as well?). To get a better idea of the data we were working with, we used Tableau to gather rating distributions for each attriute across users:

![AGV_vUdV8ikgfCCThTc2vuz0RR2MA6ktQtT3kJPlRLZxti8dhr0OwbhktrSaVjpboKAkwkRrrLE2cLEAdxOVgbFmG7Yohn6xrNCOIf520ZiySsPUTGsGb652qib9FxhgxeGkVbsOksrDUhQSzY8KATQa82NM9VS-4Ro=s2048](https://github.com/user-attachments/assets/f036788b-6d8e-45e5-9430-53e941f663c1)

Our next move was to compute a correlation matrix, then use k-means clustering to identify related attributes.
However, we found that attributes had low correlation:

![AGV_vUcH9Idlp7e75GQnSmPdkzZ4tm01rXCZL5dcSehZHcb95ZF2cNt5lT1qRjpvTq3RUIYyV_O6FfzRafKwcskI58ThGipw35WMB3yVcsRrnySC0F-xVdWaImCyd8UyXRXYMm2ZJxbQjxmCWYOG4qE7JnoYmVcWiV1A=s2048](https://github.com/user-attachments/assets/d9008408-027c-4fbd-9a9d-558991f69b9f)

Because we weren't able to form clusters, we were inspired to develop a sophisticated algorithm to match users based on their unique travel interests.
## What we did
The **HappyTrails** web app matches users by gathering input from thousands of travelers to determine how close an individual’s interests align with other users’ interests and landmark ratings. For example, a user that is very interested in seeing museums and libraries but not gardens would match with other users who rate these attractions similarly.
## How we did it
This is done by using a k-nearest neighbors (KNN) algorithm - each user’s rating values are treated as a 24 dimensional vector (one dimension for each attribute) and compared to the surrounding data. The algorithm measures the distance between vectors and chooses the closest ones to match with.

![AGV_vUetDPFeMDq4WZ30cc7b9gX_bpnd6Z85cbZ8Fx3cROT58NN5vw8z69_as4tmXesrclTc1c_40ZtIklGSTbBx2YeUFv38Hu3gxx_RFFqjuYLGt8YPgk_Z7upKOHPfETvuN1doXlDDiPaYJ-Alsy4LiC8wbdiC0JI=s2048](https://github.com/user-attachments/assets/b14f9b19-5e9a-4de7-9025-e8ed8c5d2d31)

## Our solution: Meet, Happy Trails

#### Happy Trails enables users to find their perfect travel buddy.

<img width="711" alt="image" src="https://github.com/user-attachments/assets/001ed26e-42d8-48b4-9ab7-093f8414ff72">

### Interested in learning more?

### Click Here: https://youtu.be/fEWcttEybOU

Our system combines a friendly interface with a backend vector analysis to find connections that would otherwise be missed.

Skills: Next.js, React, TailwindCSS, Shad/cn, Firebase, Firestore, No-SQL Databases, Fire Auth (OAuth2), FastAPI, Python, sklearn, numpy, K-Closest neighbors
