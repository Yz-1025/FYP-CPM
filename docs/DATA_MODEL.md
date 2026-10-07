# 資料模型（對應前端顯示欄位）

主鍵：`pcmNo`（同 MongoDB `_id`）。

| 前端顯示 | 文件路徑 | 現階段來源 |
|----------|-----------|------------|
| 名稱 | `display.name` | 官方 XML（中／英） |
| 註冊編號 | `pcmNo` | 官方 XML |
| 劑型 | `display.dosageForm` | 官方 XML |
| 成分 | `display.ingredients` | 官方 XML（繁中 `active_label`） |
| 製造商 | `display.manufacturer` | 爬蟲（暫為空 → 前端「暫無資料」） |
| 註冊持有人 | `display.regHolder` | 官方 XML `regHolderApplicant` |
| 包裝規格 | `display.packings[]` | 官方 XML |
| 藥效 | `display.efficacy` | 爬蟲 |
| 禁忌症 | `display.contraindications` | 爬蟲 |
| 注意事項 | `display.precautions` | 爬蟲 |
| 圖片 | `display.images[]` | 爬蟲 |

每個可翻譯文字欄位為 `{ zh, en, sc, source }`（`zh`＝繁中官方 CSV，`sc`＝簡中，`en`＝英文）。官方資料來源：`search-results-download_*.csv`（匯出日期見 CSV 首行）。爬蟲寫入時請設定 `source`（URL 或站名），勿覆蓋 `source: "official"` 的官方欄位。
