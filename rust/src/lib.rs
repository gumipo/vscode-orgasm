use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct TypingBully {
    type_count: u32,
    last_milestone: u32,
}

#[wasm_bindgen]
impl TypingBully {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            type_count: 0,
            last_milestone: 0,
        }
    }

    // ここのメソッド名をmaybe_insultからincrement_and_checkに変更
    #[wasm_bindgen]
    pub fn increment_and_check(&mut self) -> Option<String> {
        self.type_count += 1;

        // 特別なマイルストーン
        match self.type_count {
            count if count == 50 => Some("あっ...なんか来る...".to_string()),
            count if count == 80 => Some("ちょっと...やばいかも...♡".to_string()),
            count if count == 100 => Some("あぁん...きちゃう...！".to_string()),
            count if count == 150 => Some("もっと...もっとぉ...！".to_string()),
            count if count == 180 => Some("あっ...だめ...とまらないぃ...！".to_string()),
            count if count == 200 => Some("あぁん...もうダメ...！".to_string()),
            count if count == 250 => Some("んッ...！あッ...！イクぅ...！".to_string()),
            count if count == 280 => Some("イっちゃう...イっちゃうよぉ...！".to_string()),
            count if count == 300 => Some("イクっ！イクイクイクぅっ！".to_string()),
            count if count == 350 => Some("もうだめぇ...！止まらないのぉ...！".to_string()),
            count if count == 380 => Some("あぁっ...！また...また来るぅ...！".to_string()),
            count if count == 400 => Some("WHITE_SCREEN".to_string()),
            _ => {
                if self.type_count >= 400 {
                    if self.type_count % 20 == 0 {
                        // 400回以降は余韻
                        let phrases = vec![
                            "はぁ...はぁ...♡",
                            "ふにゃぁ...♡",
                            "まだ...びくびくしてる...♡",
                            "あぅ...余韻やばい...♡",
                            "も...もう無理ぃ...♡",
                        ];
                        Some(phrases[self.type_count as usize / 20 % phrases.len()].to_string())
                    } else {
                        None
                    }
                } else if self.type_count % 20 == 0 {
                    // 通常時の20回ごとの反応
                    let phrases = vec![
                        "んっ...♡",
                        "あぁ...♡",
                        "はぁん...♡",
                        "きもちぃ...♡",
                        "もっとぉ...♡",
                    ];
                    Some(phrases[self.type_count as usize / 20 % phrases.len()].to_string())
                } else {
                    None
                }
            }
        }
    }

    #[wasm_bindgen]
    pub fn get_count(&self) -> u32 {
        self.type_count
    }
}
