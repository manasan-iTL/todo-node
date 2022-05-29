# todo-node

## 動かし方

1. クローンして、プロジェクトフォルダに移動。

```html
git clone git@github.com:manasan-iTL/todo-node.git

cd ./todo-node
```

2. `npm install` を実行。
3. PostgresSQLでデータベースを作成。
4. プロジェクト直下に`.env`　を作成、又はPCの環境変数に以下を記述

```html
DB_USER=ユーザ名
DB_HOST=localhost or 127.0.0.1 (基本ローカルで動かす用)
DB_DATABASE=データベース名
DB_PASSWORD=ユーザのパスワード
DB_PORT=ポート番号
```

5. ここまでできたら、`npm start` でサーバが実行されるので、ブラウザで`http://localhost:3000`にアクセス。
