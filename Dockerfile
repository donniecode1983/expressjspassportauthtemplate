FROM node

RUN mkdir /app
WORKDIR /app

COPY . . 

RUN npm install

# CMD tail -f /dev/null
CMD node app.js