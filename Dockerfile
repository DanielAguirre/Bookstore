FROM mhart/alpine-node:4.8
MAINTAINER danter1@gmail.com

ONBUILD RUN npm install nodemon -g

WORKDIR ./app  
COPY app/ .
