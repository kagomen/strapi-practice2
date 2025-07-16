FROM node:22-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
# ARG: イメージをビルドする際に引数を定義できるよう設定（デフォルト値をdevelopmentに設定）
ARG NODE_ENV=development
# 環境変数を引数に設定できるようにする
ENV NODE_ENV=${NODE_ENV}

# パッケージはキャッシュしたいので、ディレクトリをパッケージ用とアプリ用の二階層に分ける
# こちらはパッケージ用で、COPY命令時に変更があれば後続のすべてのRUNが実行される
WORKDIR /opt/
# 最後の引数がコンテナ内のコピー先となる。それ以外はホストマシンのコピー対象
COPY package.json package-lock.json ./
# 一部のnpmパッケージは内部でC++を利用しているため、node-gypをインストールする
# node-gypは、osにインストールされているgccを呼び出し、nodejs用にコンパイルするよう指示を出す
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH=/opt/node_modules/.bin:$PATH

# アプリ用ディレクトリ
WORKDIR /opt/app
# ホストのカレントディレクトリからコンテナのカレントディレクトリへソースコードをコピーする
COPY . .
# 権限をrootからnodeに変更
RUN chown -R node:node /opt/app
USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]
