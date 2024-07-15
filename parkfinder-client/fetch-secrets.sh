#!/bin/sh

# Fetch secrets from AWS SSM Parameter Store
export VITE_GOOGLEMAP_KEY=$(aws ssm get-parameter --name "VITE_GOOGLEMAP_KEY" --with-decryption --query "Parameter.Value" --output text)
export VITE_NPS_API_KEY=$(aws ssm get-parameter --name "VITE_NPS_API_KEY" --with-decryption --query "Parameter.Value" --output text)
export VITE_GOOGLE_API_KEY=$(aws ssm get-parameter --name "VITE_GOOGLE_API_KEY" --with-decryption --query "Parameter.Value" --output text)
export VITE_OPENWEATHER_API_KEY=$(aws ssm get-parameter --name "VITE_OPENWEATHER_API_KEY" --with-decryption --query "Parameter.Value" --output text)

# Create .env file
echo "VITE_GOOGLEMAP_KEY=$VITE_GOOGLEMAP_KEY" > .env
echo "VITE_NPS_API_KEY=$VITE_NPS_API_KEY" >> .env
echo "VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY" >> .env
echo "VITE_OPENWEATHER_API_KEY=$VITE_OPENWEATHER_API_KEY" >> .env
