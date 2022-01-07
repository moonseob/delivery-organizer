ARG base=node:14.17.1
FROM $base as builder

WORKDIR /opt/delivery
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM $base

# add tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /usr/local/bin/tini
RUN chmod +x /usr/local/bin/tini

WORKDIR /opt/delivery
COPY src/server/package.json src/server/package-lock.json ./
RUN npm ci

ENV NODE_ENV=production
COPY --from=builder /opt/delivery/dist/delivery-organizer ./app
COPY ./src/server .
RUN npm run build

COPY docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["/usr/local/bin/tini", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD [ "delivery" ]
