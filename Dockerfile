FROM node:lts AS dependencies

ARG API_URL_CLIENT
ARG DOMAIN
ARG PORT

ENV API_URL_CLIENT=${API_URL_CLIENT}
ENV DOMAIN=${DOMAIN}
ENV PORT=${PORT}

WORKDIR /frontend-tulk

COPY package.json pnpm-lock.yaml postcss.config.mjs eslint.config.mjs tsconfig.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE ${PORT}

CMD ["pnpm", "start"]
