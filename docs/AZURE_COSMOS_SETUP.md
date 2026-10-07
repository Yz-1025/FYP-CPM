# Azure Cosmos DB（MongoDB API）本機連線設定

本專案在本機跑 **Express + Vue**，資料庫使用 **Azure Cosmos DB for MongoDB**（尚未部署 App 到 Azure 也可以先連線）。

## 1. 建立 Cosmos 帳戶（Azure Portal）

1. 登入 [Azure Portal](https://portal.azure.com)。
2. 搜尋 **Azure Cosmos DB** → **Create**。
3. 在 API 選項中選 **Azure Cosmos DB for MongoDB**（若看到 vCore / 傳統 RU 兩種，學生方案常見為 **vCore 叢集** 或 **Request Unit (RU) 帳戶**；兩者連線字串格式不同，以 Portal 顯示為準）。
4. 建議設定：
   - **Resource group**：例如 `rg-fyp-cpm`
   - **Account / Cluster name**：全域唯一小寫名稱，例如 `fypcpm-mongo`
   - **Region**：East Asia 或離你最近的區域
   - **Capacity**：有 **Free tier** 或 **Serverless** 可優先選，節省 Azure for Students 額度
5. 建立完成後進入該資源。

## 2. 取得 MongoDB 連線字串

1. 左側選 **Connection strings**（或 **Connect** → **Drivers**）。
2. 複製 **Primary connection string**（MongoDB 格式）。
3. 常見格式（RU 帳戶範例）：

   ```
   mongodb://<account>:<primary-key>@<account>.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000
   ```

   vCore 叢集可能為 `mongodb+srv://...`；請以 Portal 為準。

4. 在專案根目錄複製環境檔：

   ```powershell
   cd C:\Users\yz\Desktop\FYP
   copy .env.example .env
   ```

5. 把連線字串貼到 `.env` 的 `COSMOS_CONNECTION_STRING`（**不要** commit `.env`）。

## 3. 防火牆（本機開發必做）

在 Cosmos 資源中打開 **Networking** / **Firewall and virtual networks**：

- 開發階段可暫時勾選 **Allow access from Azure Portal** 與 **Add my current IP**（你的家用 IP 會變，換網路後要再加）。
- 僅本機開發、不部署時，仍需讓你電腦的 IP 能連到 Cosmos。

## 4. 匯入官方 CSV（建議，2026-10-07 匯出）

從中醫藥管理委員會網站下載的 `search-results-download_en/tc/sc.csv`：

```powershell
cd C:\Users\yz\Desktop\FYP\scripts
pip install -r requirements.txt
python import_official_csv.py `
  --en "C:\Users\yz\Downloads\search-results-download_en.csv" `
  --tc "C:\Users\yz\Downloads\search-results-download_tc.csv" `
  --sc "C:\Users\yz\Downloads\search-results-download_sc.csv"
```

（舊版 XML 仍可用 `import_official_pcm.py`，約 8377 條；CSV 為較新約 **8397** 條。）

## 5. 啟動後端與前端

```powershell
cd C:\Users\yz\Desktop\FYP\backend
npm install
npm start
```

```powershell
cd C:\Users\yz\Desktop\FYP\frontend
npm install
npm run dev
```

## 6. 常見錯誤

| 現象 | 處理 |
|------|------|
| `bad auth` | 連線字串中的 key 過期或複製不完整，到 Portal 重新複製 Primary key |
| `connection timed out` | 防火牆未加入目前 IP |
| `Retryable writes are not supported` | 連線字串加上 `retrywrites=false`（`.env.example` 已含） |
| 本機沒裝 `az` CLI | 可全程用 Portal；CLI 非必須 |

## 7. 之後部署（現階段可略）

中期再將 **backend** 部署到 Azure App Service，前端可放 Static Web Apps 或同一 App Service；連線字串改為 App Service **Configuration** 中的應用程式設定，與本機 `.env` 同名即可。
