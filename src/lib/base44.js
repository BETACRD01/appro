import { createClient } from '@base44/sdk';

import { appParams } from './app-params';

const { appId, token, functionsVersion, appBaseUrl, chatFunction } = appParams;

export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  appBaseUrl,
});

export const hasBase44Config = Boolean(appId && token && appBaseUrl);

export async function invokeKivaruxChat(message, model) {
  if (!hasBase44Config) return null;
  const result = await base44.functions.invoke(chatFunction, { message, model });
  return result?.data?.response || result?.response || null;
}
