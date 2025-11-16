export const delay = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(id);
          reject(new DOMException('Aborted', 'AbortError'));
        },
        { once: true }
      );
    }
  });

export const waitUntil = async (iso: string, signal?: AbortSignal) => {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff > 0) await delay(diff, signal);
};

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('uk-UA');
};

export const formatMoney = (v: number) => v.toLocaleString('uk-UA') + ' $';
