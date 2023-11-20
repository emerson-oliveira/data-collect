# Use a base image with Node.js pre-installed
FROM node:18

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Set the working directory in the container
WORKDIR /app

WORKDIR /output

# Install necessary dependencies
RUN apt-get update && apt-get install -y libnss3 cron
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
#RUN npm install -g npm@10.2.0
RUN npm install

# Copy the application files to the container
COPY ./app .

# Copy the cron file to the container
# COPY ./cronjob /etc/cron.d/cronjob

# Give execution rights to the cron job
# RUN chmod 0644 /etc/cron.d/cronjob

# Create the log file to be able to run tail
# RUN touch /var/log/cron.log

# Expose the port used by your application (if applicable)
# EXPOSE 3000

# Command to run your application and start cron
# CMD cron && tail -f /var/log/cron.log

# Command to run your application
CMD ["node", "index.js"]