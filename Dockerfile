FROM node:14-buster
ENV TZ="America/Los_Angeles"
RUN apt-get update && apt-get install -y build-essential libcairo2-dev libpango1.0-dev
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "deploy"]
