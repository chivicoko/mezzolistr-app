# Mezzolistr Music App

## Description

Mezzolistr is a mini music app that fetches three musicians data. It's a task that I was asked to do in Dufuna Code Camp.
What this app does is basically selecting one song periodically from one of these three African artistes: Fela Kuti, Bob Marley, and Brenda Fassie, and stores it in the database. The test version checks every ten seconds, while the production version checks every one minute.

I built this with the MERN stack (Mongodb, Express, Node React). I used the Mongoose ODM for the MongoDB. I also used raw CSS for the design of the GUI.

I was supposed to use Docker to containerize in the DockerHub, but my machine (Windows OS in HP Pavillion g series ...) is incapable of virtualization. I tried to see if there is a way around the process of dockerization that I can use to achieve that, but there's none. If you know of any please let me know. For now I am still stuck with my machine. Git and GitHub are helping too.

I am considering expanding this app into a bigger app with more useful features.

### Display

The details are displayed on the browser:
- The name of the track fetched
- The name of the artiste that owns the track
- The total number of checks at each check
- The time of the last check

