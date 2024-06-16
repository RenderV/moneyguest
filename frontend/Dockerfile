FROM node:21
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000

# Start the app
CMD ["npm", "start"]