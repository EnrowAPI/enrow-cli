import { Command } from 'commander';
import Enrow from 'enrow';
import { getApiKey } from '../../config';
import { print } from '../../output';

export const findCommand = new Command('find')
  .description('Find a phone number')
  .option('--linkedin <url>', 'LinkedIn profile URL')
  .option('--first <name>', 'First name')
  .option('--last <name>', 'Last name')
  .option('--domain <domain>', 'Company domain')
  .option('--wait', 'Wait for result')
  .option('--format <format>', 'Output format', 'json')
  .action(async (opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.phone.find(
      {
        linkedinUrl: opts.linkedin,
        firstName: opts.first,
        lastName: opts.last,
        companyDomain: opts.domain,
      },
      opts.wait ? { waitForResult: true } : undefined
    );
    print(result, opts.format);
  });

export const getCommand = new Command('get')
  .description('Get phone search result by ID')
  .argument('<id>', 'Search ID')
  .option('--format <format>', 'Output format', 'json')
  .action(async (id, opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.phone.get(id);
    print(result, opts.format);
  });

export const findBulkCommand = new Command('find-bulk')
  .description('Find phones in bulk from CSV')
  .requiredOption('--file <path>', 'CSV file')
  .option('--format <format>', 'Output format', 'json')
  .action(async (opts) => {
    const { readFileSync } = await import('fs');
    const csv = readFileSync(opts.file, 'utf-8');
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map((h: string) => h.trim());
    const searches = lines.slice(1).map((line: string) => {
      const values = line.split(',').map((v: string) => v.trim());
      const obj: Record<string, string> = {};
      headers.forEach((h: string, i: number) => { obj[h] = values[i]; });
      return obj;
    });

    const enrow = new Enrow(getApiKey());
    const result = await enrow.phone.findBulk({ searches });
    print(result, opts.format);
  });

export const getBulkCommand = new Command('get-bulk')
  .description('Get bulk phone search results')
  .argument('<id>', 'Batch ID')
  .option('--format <format>', 'Output format', 'json')
  .action(async (id, opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.phone.getBulk(id);
    print(result, opts.format);
  });
