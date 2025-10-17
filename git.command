#!/bin/bash

# 1. ユーザー入力の待機と作品概要の取得
read -p "追加した作品の概要を記載してください: " commit_summary

# 2. 空白（または何も入力しない）の場合の処理
#    変数 `commit_summary` が空（""）かどうかをチェックします。
if [ -z "$commit_summary" ]; then
    commit_summary="保存"
fi

# 3. 全ファイルのステージング
git add .

# 4. コミットメッセージの設定とコミットの実行
#    エディタを起動せず、入力された内容（または「保存」）をそのままメッセージとしてコミットします。
git commit -m "$commit_summary"

# 5. リモートリポジトリへのプッシュ
#    コミットが成功した後、自動的に実行されます。
git push