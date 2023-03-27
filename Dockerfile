# Use Latest Node Alpine
FROM node:alpine

# Environmental Variables
ENV PORT 3000
ENV NODE_ENV production

# Copy Source Code
COPY . /app

WORKDIR /app

# Install Dependencies
RUN npm install --legacy-peer-deps
RUN npm run build

CMD ["npm", "start"]