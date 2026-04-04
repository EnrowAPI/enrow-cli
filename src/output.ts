type Format = 'json' | 'table' | 'csv';

export function formatOutput(data: unknown, format: Format = 'json'): string {
  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2);

    case 'table':
      if (Array.isArray(data)) {
        if (data.length === 0) return '(empty)';
        const keys = Object.keys(data[0]);
        const widths = keys.map((k) =>
          Math.max(k.length, ...data.map((row) => String(row[k] ?? '').length))
        );
        const header = keys.map((k, i) => k.padEnd(widths[i])).join('  ');
        const separator = widths.map((w) => '-'.repeat(w)).join('  ');
        const rows = data.map((row) =>
          keys.map((k, i) => String(row[k] ?? '').padEnd(widths[i])).join('  ')
        );
        return [header, separator, ...rows].join('\n');
      }
      return Object.entries(data as Record<string, unknown>)
        .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
        .join('\n');

    case 'csv':
      if (Array.isArray(data)) {
        if (data.length === 0) return '';
        const keys = Object.keys(data[0]);
        const header = keys.join(',');
        const rows = data.map((row) =>
          keys.map((k) => {
            const val = String(row[k] ?? '');
            return val.includes(',') ? `"${val}"` : val;
          }).join(',')
        );
        return [header, ...rows].join('\n');
      }
      const entries = Object.entries(data as Record<string, unknown>);
      return entries.map(([k, v]) => `${k},${v}`).join('\n');

    default:
      return JSON.stringify(data, null, 2);
  }
}

export function print(data: unknown, format: Format = 'json'): void {
  console.log(formatOutput(data, format));
}
