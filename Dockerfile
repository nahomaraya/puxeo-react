FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code to the working directory
COPY . ./

# Build the React app
RUN yarn build