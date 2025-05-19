FROM node:20.19.2

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    python3-dev \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/bash api

WORKDIR /home/api

RUN chown api:api /home/api

COPY package*.json ./

RUN chown api:api package*.json

RUN corepack enable pnpm

RUN npm install

COPY . .

RUN mkdir playground

RUN npm run build

RUN chown -R api:api /home/api/playground

USER api

EXPOSE 8000

CMD ["npm", "start"]