FROM 8.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2802

CMD[ "npm" , "start" ]



