# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN yarn install

# Copy app source
COPY . .

# Build app
RUN yarn build

# Start app
CMD [ "yarn", "start" ]
