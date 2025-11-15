import { apiClient } from '../../../api/client';
import type { ErrorResponse } from '../../../types/errors';
import type { PricesMap } from '../../../types/models';
import { delay, waitUntil } from '../utils/time';

export const runSearchFlow = async (
  countryId: string,
  options: { maxRetries?: number; signal?: AbortSignal } = {}
): Promise<PricesMap> => {
  const { maxRetries = 2, signal } = options;

  const { token, waitUntil: initialWait } = await apiClient.startSearchPrices(countryId);

  let waitTime = initialWait;
  let retries = maxRetries;

  while (true) {
    await waitUntil(waitTime, signal);

    try {
      const { prices } = await apiClient.getSearchPrices(token);
      return prices;
    } catch (err) {
      const e = err as ErrorResponse;

      if (e.code === 425 && e.waitUntil) {
        waitTime = e.waitUntil;
        continue;
      }

      if (retries > 0) {
        retries--;
        await delay(1000, signal);
        continue;
      }

      throw err;
    }
  }
};
