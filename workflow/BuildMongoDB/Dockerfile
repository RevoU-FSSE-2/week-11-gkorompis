#Pull mysql iamge
FROM node:latest

#Defining working directory to execute subsequent commands inside the container
WORKDIR /app

#Copying all the files and directories from the host machine into the specified working directory inside the container. All files and directories that are listed in gitignore file will not be copied into the container.
COPY . .

#RUN will instruct docker to run npm install only during the image build process in order to install all necessary node JS packages as specified in package.json
RUN npm install
WORKDIR ./src
#Transpiling typescript file into JS
RUN npx tsc
WORKDIR ../
#Exposing application port
EXPOSE 3002

#CMD will instruct docker to run the command specified after, upon starting running the container
CMD ["node", "build.js"]
