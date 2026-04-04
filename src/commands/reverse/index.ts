import { Command } from 'commander';
import Enrow from 'enrow';
import { getApiKey } from '../../config';
import { print } from '../../output';

export const findCommand = new Command('find')
  .description('Find a person from an email')
  .requiredOption('--email <email>', 'Email to look up')
  .option('--wait', 'Wait for result')
  .option('--format <format>', 'Output format', 'json')
  .action(async (opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.reverseEmail.find(
      { email: opts.email },
      opts.wait ? { waitForResult: true } : undefined
    );
    print(result, opts.format);
  });

export const getCommand = new Command('get')
  .description('Get reverse email result by ID')
  .argument('<id>', 'Search ID')
  .option('--format <format>', 'Output format', 'json')
  .action(async (id, opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.reverseEmail.get(id);
    print(result, opts.format);
  });

export const findBulkCommand = new Command('find-bulk')
  .description('Reverse lookup emails in bulk from file')
  .requiredOption('--file <path>', 'File with one email per line')
  .option('--format <format>', 'Output format', 'json')
  .action(async (opts) => {
    const { readFileSync } = await import('fs');
    const emails = readFileSync(opts.file, 'utf-8')
      .trim()
      .split('\n')
      .map((e: string) => ({ email: e.trim() }));

    const enrow = new Enrow(getApiKey());
    const result = await enrow.reverseEmail.findBulk({ emails });
    print(result, opts.format);
  });

export const getBulkCommand = new Command('get-bulk')
  .description('Get bulk reverse email results')
  .argument('<id>', 'Batch ID')
  .option('--format <format>', 'Output format', 'json')
  .action(async (id, opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.reverseEmail.getBulk(id);
    print(result, opts.format);
  });
