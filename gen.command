# ユーザーに入力を求めるメッセージを表示
read -p "ひな型としてコピーするディレクトリ名 (basic, shader, sound) を入力してください: " userInput

# ------------------------------
# ⚠️ 入力チェック処理
# ------------------------------
# 入力が許可された3種類のいずれかであるかチェック
if [ "$userInput" != "basic" ] && [ "$userInput" != "shader" ] && [ "$userInput" != "sound" ]; then
    echo "❌ エラー: 入力された '$userInput' は許可されたひな型ではありません。"
    echo "使用できるひな型は: basic, shader, sound です。"
    exit 1 # エラーコード 1 でスクリプトを終了
fi
# ------------------------------

# 現在の日時を変数に格納 (例: 2025-10-17-22-40-38)
now=$(date +%Y-%m-%d-%H-%M-%S)

# 各ファイル/ディレクトリのパスを定義
md_file_path="memo/index.md"
content_file_path="src/${now}" # 新しいコンテンツディレクトリのパス

# テンプレートディレクトリを新しい日時のディレクトリ名でコピー
# 例: templete/basic を src/2025-10-17-22-40-38 にコピー
cp -R "templete/${userInput}" "${content_file_path}"

# VS Codeでコピーしたディレクトリ内の主要ファイルを開く
# -r オプションは、すでに開いているウィンドウでファイルを開くことを試みます
code -r "${content_file_path}/sketch.js"
code -r "${content_file_path}/index.html"

# index.mdに新しいエントリを追記
# 追記する文字列: 改行と、[日時] (src/日時) の形式のリンク
echo -e "\n - [${now}] (../${content_file_path})" >> "${md_file_path}"

# 完了メッセージを分かりやすく表示
echo "✅ テンプレート '${userInput}' を基に、'${content_file_path}' を作成しました。"
echo "🔗 '${md_file_path}' にリンクを追記しました。"