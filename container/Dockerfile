# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG KEG_NODE_VERSION
ARG GIT_STAGE_IMAGE_FROM=node:$KEG_NODE_VERSION
FROM $GIT_STAGE_IMAGE_FROM as builder

WORKDIR /

# Add npm-run-all globally
RUN yarn global add npm-run-all

# Path of the app within the docker container
ARG DOC_APP_PATH=${DOC_APP_PATH:-/keg/app}
ARG KEG_PROXY_PORT=${KEG_PROXY_PORT:-3000}

# Copy over the app to a temp directory
COPY . $DOC_APP_PATH

# Install the dependecies with yarn setup, then remove the .npmrc
RUN cd $DOC_APP_PATH; \
    yarn install --ignore-engines; \
    yarn cache clean;

# Install git for the new stage
RUN apk add --no-cache git bash sudo; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd

# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Expose container ports
EXPOSE $KEG_PROXY_PORT

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

SHELL [ "/bin/bash" ]

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
