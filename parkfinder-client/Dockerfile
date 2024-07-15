# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Install AWS CLI
RUN apk add --no-cache python3 py3-pip && pip3 install awscli

# Copy the script to fetch secrets
COPY fetch-secrets.sh .

# Fetch secrets and build the React app
RUN ./fetch-secrets.sh && npm run build

# Step 2: Server with Nginx
# Use an official Nginx runtime as a parent image
FROM nginx:1.23-alpine

# Set the working directory to the Nginx HTML directory
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static assets
RUN rm -rf ./*

# Copy the built React app from the build stage to the Nginx HTML directory
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
