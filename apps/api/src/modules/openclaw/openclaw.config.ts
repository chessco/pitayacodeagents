export const openClawConfig = {
  baseUrl: process.env.OPENCLAW_BASE_URL || 'http://127.0.0.1:18789',
  webhookPath: process.env.OPENCLAW_WEBHOOK_PATH || '/hooks/agent',
  webhookSecret: process.env.OPENCLAW_WEBHOOK_SECRET || 'pitaya_secret',
};
