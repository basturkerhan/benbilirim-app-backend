# Benbilirim back-end
<br>
I've been working on React for a while. The other day I came across a format on TV. In this format, a football position stopped at the critical moment and participants were trying to guess whether there was a goal or not. I thought of making an application adapted from this format using MERN stack (Mongo,Express,React,Nodejs). 

**In this repo, you see the back-end of the application. If you want to see front-end, See:**
<br>
**See Demo: https://benbilirim-frontend.vercel.app/**
<br>

## TECHNOLOGIES
#### -MongoDB
#### -Express
#### -React
#### -Node
<br>

## UTILITIES
##### Auth page (login, logout, register, forgot password, reset password)
##### Ranking page by score
##### Video page: I used react-video-player on the video page
##### Countdown: An 8-second timer starts when the video stops. If there is no answer when the counter is over, the right to answer is lost.
##### Specific Header for login or not.
##### Specific Router for login or not
##### Admin Page: If your role is equal to "admin", you can visit admin page. In this page upload, remove or update video or block user.
<br>

## OPTIONS
### Go config/enc/config.env

```
FRONT_END_URL = your front-end url will come here

MONGO_URI = your MongoDB URI will come here

JWT_SECRET_KEY = Jsonwebtoken secret key

RESET_PASSWORD_EXPIRE = 3600000  If user want to reset password, indicates when the reset link will be disabled (second)

SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS = Nodemailer options
```
<br>

## ROUTERS
**host/v1/`the routes contained in the following files`

**Auth Routers**
routers/auth.js

**Admin Routers**
routers/admin.js

**Video Routers**
routers/video.js

**User Routers**
routers/user.js
<br>

## IMAGES
### Auth Page
![Screenshot](https://github.com/basturkerhan/benbilirim-app-backend/blob/main/app-images/1.PNG)
### Video Page
![Screenshot](https://github.com/basturkerhan/benbilirim-app-backend/blob/main/app-images/2.PNG)
### All Videos Watched Page
![Screenshot](https://github.com/basturkerhan/benbilirim-app-backend/blob/main/app-images/3.PNG)
### Ranking Page
![Screenshot](https://github.com/basturkerhan/benbilirim-app-backend/blob/main/app-images/4.PNG)
### Admin Page
![Screenshot](https://github.com/basturkerhan/benbilirim-app-backend/blob/main/app-images/5.PNG)
### Loading Page
![Screenshot](https://github.com/basturkerhan/benbilirim-app-backend/blob/main/app-images/6.PNG)
