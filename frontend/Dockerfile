# Stage 1 - Build the React app
FROM node:16 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Stage 2 - Serve the React app
FROM node:16
WORKDIR /app
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]