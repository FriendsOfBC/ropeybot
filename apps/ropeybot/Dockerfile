FROM node:20

COPY ./dist/bundle.js* /bot/

WORKDIR /bot/cfg
CMD ["node", "--enable-source-maps", "/bot/bundle.js"]
