FROM node:20.13-alpine
WORKDIR /app
# COPY . .
COPY /package.json .

RUN apt update
RUN apt install ffmpeg

# RUN apt-get update && apt-get install -y \
#     libcairo2-dev \
#     libpango1.0-dev \
#     libjpeg-dev \
#     libgif-dev \
#     librsvg2-dev \
#     libxi-dev \
#     libglu1-mesa-dev \
#     libglew-dev \
#     python2.7 \
#     python-pip \
#     ffmpeg \
#     xvfb

RUN npm install -g supervisor
RUN npm install

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/bin/dumb-init
RUN chmod 0777 /usr/bin/dumb-init

COPY . .

EXPOSE 8000
ENTRYPOINT ["/usr/bin/dumb-init", "--", "xvfb-run", "-s", "-ac -screen 0 1280x1024x24"]
CMD [ "npm", "run", "server" ]