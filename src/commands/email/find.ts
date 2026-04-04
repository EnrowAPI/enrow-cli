import { Command } from 'commander';
import Enrow from 'enrow';
import { getApiKey } from '../../config';
import { print } from '../../output';

export const findCommand = new Command('find')
  .description('Find a professional email address')
  .requiredOption('--domain <domain>', 'Company domain')
  .option('--first <name>', 'First name')
  .option('--last <name>', 'Last name')
  .option('--country <code>', 'Country code (ISO 3166-1)')
  .option('--wait', 'Wait for result (auto-poll)')
  .option('--format <format>', 'Output format: json, table, csv', 'json')
  .action(async (opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.email.find(
      {
        companyDomain: opts.domain,
        firstName: opts.first,
        lastName: opts.last,
        settings: opts.country ? { countryCode: opts.country } : undefined,
      },
      opts.wait ? { waitForResult: true } : undefined
    );
    print(result, opts.format);
  });

export const getCommand = new Command('get')
  .description('Get email search result by ID')
  .argument('<id>', 'Search ID')
  .option('--format <format>', 'Output format', 'json')
  .action(async (id, opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.email.get(id);
    print(result, opts.format);
  });

export const findBulkCommand = new Command('find-bulk')
  .description('Find emails in bulk from CSV')
  .requiredOption('--file <path>', 'CSV file (columns: company_domain, first_name, last_name)')
  .option('--webhook <url>', 'Webhook URL')
  .option('--format <format>', 'Output format', 'json')
  .action(async (opts) => {
    const { readFileSync } = await import('fs');
    const csv = readFileSync(opts.file, 'utf-8');
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map((h: string) => h.trim());

    const searches = lines.slice(1).map((line: string) => {
      const values = line.split(',').map((v: string) => v.trim());
      const obj: Record<string, string> = {};
      headers.forEach((h: string, i: number) => {
        obj[h] = values[i];
      });
      return obj;
    });

    const enrow = new Enrow(getApiKey());
    const result = await enrow.email.findBulk({
      searches,
      settings: opts.webhook ? { webhook: opts.webhook } : undefined,
    });
    print(result, opts.format);
  });

export const getBulkCommand = new Command('get-bulk')
  .description('Get bulk email search results')
  .argument('<id>', 'Batch ID')
  .option('--format <format>', 'Output format', 'json')
  .action(async (id, opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.email.getBulk(id);
    print(result, opts.format);
  });
