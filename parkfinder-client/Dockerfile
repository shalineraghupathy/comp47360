# Step 1: Build React App
FROM node:alpine3.18 as build
WORKDIR /app 
COPY package.json .
RUN npm install
COPY . .

# Build the application
RUN npm run build

# Debugging step: list the contents of /app to ensure build directory is created
RUN ls -la /app
RUN ls -la /app/build

# Step 2: Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf *

# Copy the build output from the previous stage
COPY --from=build /app/build .

# Expose port 80
EXPOSE 80

# Start nginx
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
