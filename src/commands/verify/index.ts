import { Command } from 'commander';
import Enrow from 'enrow';
import { getApiKey } from '../../config';
import { print } from '../../output';

export const singleCommand = new Command('single')
  .description('Verify a single email')
  .requiredOption('--email <email>', 'Email to verify')
  .option('--format <format>', 'Output format', 'json')
  .action(async (opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.verify.single({ email: opts.email });
    print(result, opts.format);
  });

export const getCommand = new Command('get')
  .description('Get verification result by ID')
  .argument('<id>', 'Verification ID')
  .option('--format <format>', 'Output format', 'json')
  .action(async (id, opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.verify.get(id);
    print(result, opts.format);
  });

export const bulkCommand = new Command('bulk')
  .description('Verify emails in bulk from file')
  .requiredOption('--file <path>', 'File with one email per line')
  .option('--format <format>', 'Output format', 'json')
  .action(async (opts) => {
    const { readFileSync } = await import('fs');
    const emails = readFileSync(opts.file, 'utf-8').trim().split('\n').map((e: string) => e.trim());
    const enrow = new Enrow(getApiKey());
    const result = await enrow.verify.bulk({ emails });
    print(result, opts.format);
  });

export const getBulkCommand = new Command('get-bulk')
  .description('Get bulk verification results')
  .argument('<id>', 'Batch ID')
  .option('--format <format>', 'Output format', 'json')
  .action(async (id, opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.verify.getBulk(id);
    print(result, opts.format);
  });
