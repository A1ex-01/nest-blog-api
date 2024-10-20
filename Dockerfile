# Base image
FROM node:18
# Create app directory
WORKDIR /usr/src/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . .
# Install app dependencies
RUN npm install pnpm -g

RUN pnpm install
# Bundle app source
# Creates a "dist" folder with the production build
RUN pnpm run build
# Start the server using the production build
CMD [ "node", "dist/main.js" ]
