FROM node:bullseye
LABEL org.opencontainers.image.source="https://github.com/jdenda/camcam"


RUN mkdir /home/node/camcam
RUN mkdir /mnt/library
COPY . /home/node/camcam
WORKDIR /home/node/camcam
RUN chown -R node:node /home/node/camcam/
RUN npm install sharp --unsafe-perm
RUN npm install

CMD [ "node","server.js" ]