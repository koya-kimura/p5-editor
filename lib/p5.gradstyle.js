class GradStyle {
    /**
     * 指定されたモードに基づいて描画スタイルを設定します。
     * @param {string|p5.Color} c - 使用する色（有効なp5.jsの色または文字列）。
     * @param {string} mode - スタイルモード："fill"（塗りつぶし）、"stroke"（線）、または"grad"（グラデーション）。デフォルトは"fill"。
     * @throws {Error} 色が指定されていない場合や無効なモードの場合にエラーをスローします。
     */
    setStyle(c, mode = "fill") {
        if (!c) {
            throw new Error('Color must be specified'); // 有効な色が提供されているか確認。
        }

        switch (mode) {
            case "fill":
                // 塗りつぶしスタイルを適用：線なし、指定された色で図形を塗りつぶします。
                noStroke();
                fill(c);
                break;
            case "stroke":
                // 線スタイルを適用：塗りつぶしなし、細い線幅を設定し、指定された色で線を描画します。
                noFill();
                strokeWeight(0.01); // 細い線幅で正確に描画。
                stroke(c);
                break;
            case "grad":
                // グラデーションスタイルを適用：複数のカラーストップを持つ線形グラデーションを作成。
                const ctx = drawingContext; // 2Dキャンバス描画コンテキストにアクセス。
                const gradient = ctx.createLinearGradient(-0.5, -0.5, 0.5, 0.5); // グラデーションの方向を定義。

                // グラデーションにカラーストップを追加（透明度と明るさが異なる）。
                gradient.addColorStop(0, color(red(c), green(c), blue(c), 150)); // 半透明の基本色で開始。
                gradient.addColorStop(0.3, color(red(c) + 50, green(c) + 50, blue(c) + 50, 255)); // 明るい中間点。
                gradient.addColorStop(0.6, color(red(c), green(c), blue(c), 220)); // やや暗いトーン。
                gradient.addColorStop(1, color(red(c) - 30, green(c) - 30, blue(c) - 30, 255)); // 暗い終点。

                fill(255); // 一時的な塗りつぶし設定（p5.jsで正しくレンダリングするため）。
                noStroke(); // グラデーション描画時には線なし。
                ctx.fillStyle = gradient; // キャンバスコンテキストの塗りスタイルをグラデーションに設定。
                break;
            default:
                throw new Error('Invalid style mode'); // 無効なモード入力の場合の処理。
        }
    }

    /**
     * 楕円を指定された位置、サイズ、および回転角で描画します。
     * @param {number} x - 楕円の中心X座標。
     * @param {number} y - 楕円の中心Y座標。
     * @param {number} w - 楕円の幅。
     * @param {number} h - 楕円の高さ。
     * @param {number} angle - 回転角（ラジアン単位）。デフォルトは0。
     * @throws {Error} パラメーターが数値でない場合にエラーをスローします。
     */
    adjustedEllipse(x, y, w, h, angle = 0) {
        if ([x, y, w, h, angle].some(param => typeof param !== 'number')) {
            throw new Error('All parameters must be numbers'); // パラメーターの型を検証。
        }

        push(); // 現在の変換状態を保存。
        translate(x, y); // 指定された中心位置に移動。
        rotate(angle); // 指定された角度（ラジアン単位）で回転。
        scale(w, h); // 幅と高さの比率に合わせてスケール調整。
        ellipse(0, 0, 1, 1); // 原点に正規化された楕円を描画（`scale()`によって拡大/縮小）。
        pop(); // 前の変換状態を復元。
    };

    /**
     * 長方形を指定された位置、サイズ、および回転角で描画します。
     * @param {number} x - 長方形の中心X座標。
     * @param {number} y - 長方形の中心Y座標。
     * @param {number} w - 長方形の幅。
     * @param {number} h - 長方形の高さ。
     * @param {number} angle - 回転角（ラジアン単位）。デフォルトは0。
     * @throws {Error} パラメーターが数値でない場合にエラーをスローします。
     */
    adjustedRect(x, y, w, h, angle = 0) {
        if ([x, y, w, h, angle].some(param => typeof param !== 'number')) {
            throw new Error('All parameters must be numbers'); // パラメーターの型を検証。
        }

        push(); // 現在の変換状態を保存。
        translate(x, y); // 指定された中心位置に移動。
        rotate(angle); // 指定された角度（ラジアン単位）で回転。
        scale(w, h); // 幅と高さの比率に合わせてスケール調整。
        rectMode(CENTER); // 長方形モードを中心から描画するよう設定。
        rect(0, 0, 1, 1); // 原点に正規化された長方形を描画（`scale()`によって拡大/縮小）。
        pop(); // 前の変換状態を復元。
    };
}