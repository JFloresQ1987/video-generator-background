# # This is a dockerized version of a server that you can easily deploy somewhere.
# # If you don't want server rendering, you can safely delete this file.

# FROM node:20.13-alpine

# # Installs latest Chromium (85) package.
# RUN apk add --no-cache \
#   chromium \
#   nss \
#   freetype \
#   freetype-dev \
#   harfbuzz \
#   ca-certificates \
#   ttf-freefont \
#   ffmpeg

# # Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#   PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# # COPY package*.json ./
# # COPY tsconfig.json ./
# # COPY src src
# # COPY *.ts .
# # COPY *.tsx .

# # RUN npm i

# WORKDIR /app
# COPY . .
# RUN npm install

# # # Add user so we don't need --no-sandbox.
# # RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
# #   && mkdir -p /home/pptruser/Downloads /app \
# #   && chown -R pptruser:pptruser /home/pptruser \
# #   && chown -R pptruser:pptruser /app
# # # Run everything after as non-privileged user.
# # USER pptruser

# EXPOSE 8000

# CMD ["npm", "run", "server"] 




FROM node:20.13-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "npm", "run", "server" ]







# # FROM node:20.13-alpine
# # WORKDIR /app
# # # COPY . .
# # COPY /package.json .

# # RUN apt update
# # RUN apt install ffmpeg

# # # RUN apt-get update && apt-get install -y \
# # #     libcairo2-dev \
# # #     libpango1.0-dev \
# # #     libjpeg-dev \
# # #     libgif-dev \
# # #     librsvg2-dev \
# # #     libxi-dev \
# # #     libglu1-mesa-dev \
# # #     libglew-dev \
# # #     python2.7 \
# # #     python-pip \
# # #     ffmpeg \
# # #     xvfb

# # RUN npm install -g supervisor
# # RUN npm install

# # ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/bin/dumb-init
# # RUN chmod 0777 /usr/bin/dumb-init

# # COPY . .

# # EXPOSE 8000
# # ENTRYPOINT ["/usr/bin/dumb-init", "--", "xvfb-run", "-s", "-ac -screen 0 1280x1024x24"]
# # CMD [ "npm", "run", "server" ]