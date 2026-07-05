# CubeDrive + Buffy Backend

Lean v1 backend for querying CubeDrive directly, calling Buffy through an API channel, and returning combined workflow results.

## V1 endpoints

- `GET /health`
- `GET /cubedrive/leads/count?stage=cold`
- `GET /cubedrive/leads?stage=cold`
- `POST /workflow/cold-leads-summary`

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill `.env` with real local values. Do not commit `.env`.

## Required env vars

- `CUBEDRIVE_API_KEY`
- `CUBEDRIVE_BASE_URL`
- `BUFFY_API_TRIGGER_URL`
- `BUFFY_API_TOKEN`

Optional:

- `BUFFY_API_TRIGGER_ID`
- `INTERNAL_API_KEY`
- `PORT`
- `NODE_ENV`
- `LOG_LEVEL`
- `REQUEST_TIMEOUT_MS`

For Buffy, set `BUFFY_API_TRIGGER_URL` to the full trigger endpoint, for example:

```env
BUFFY_API_TRIGGER_URL=https://api.chatgpt.com/v1/workspace_agents/agtch_xxxxx/trigger
```

Keep the actual `BUFFY_API_TOKEN` only in `.env` locally or in your deployment platform's secret manager.

## Response shapes

Count response:

```json
{
  "status": "ok",
  "data": {
    "stage": "cold",
    "count": 42
  },
  "source": "cubedrive"
}
```

Summary workflow response:

```json
{
  "status": "ok",
  "data": {
    "stage": "cold",
    "count": 42
  },
  "agent_output": {
    "summary": "..."
  },
  "source": {
    "data": "cubedrive",
    "summary": "buffy"
  }
}
```
