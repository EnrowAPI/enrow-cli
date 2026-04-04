import { Command } from 'commander';
import Enrow from 'enrow';
import { getApiKey } from '../../config';
import { print } from '../../output';

export const infoCommand = new Command('info')
  .description('Get account info (credits, webhooks)')
  .option('--format <format>', 'Output format', 'json')
  .action(async (opts) => {
    const enrow = new Enrow(getApiKey());
    const result = await enrow.account.info();
    print(result, opts.format);
  });
