#!/usr/bin/env node

import { Command } from 'commander';
import { getConfig, saveConfig } from './config';
import { findCommand, getCommand, findBulkCommand, getBulkCommand } from './commands/email/find';
import { singleCommand as verifySingle, getCommand as verifyGet, bulkCommand as verifyBulk, getBulkCommand as verifyGetBulk } from './commands/verify/index';
import { findCommand as phoneFind, getCommand as phoneGet, findBulkCommand as phoneFindBulk, getBulkCommand as phoneGetBulk } from './commands/phone/index';
import { findCommand as reverseFind, getCommand as reverseGet, findBulkCommand as reverseFindBulk, getBulkCommand as reverseGetBulk } from './commands/reverse/index';
import { infoCommand } from './commands/account/index';

const program = new Command();

program
  .name('enrow')
  .description('Enrow CLI — find and verify professional emails and phone numbers')
  .version('1.0.0');

// Config
const configCmd = program.command('config');
configCmd
  .command('set-key')
  .argument('<key>', 'API key')
  .description('Save your API key')
  .action((key) => {
    const config = getConfig();
    config.apiKey = key;
    saveConfig(config);
    console.log('API key saved.');
  });

// Email
const emailCmd = program.command('email').description('Email finder');
emailCmd.addCommand(findCommand);
emailCmd.addCommand(getCommand);
emailCmd.addCommand(findBulkCommand);
emailCmd.addCommand(getBulkCommand);

// Verify
const verifyCmd = program.command('verify').description('Email verifier');
verifyCmd.addCommand(verifySingle);
verifyCmd.addCommand(verifyGet);
verifyCmd.addCommand(verifyBulk);
verifyCmd.addCommand(verifyGetBulk);

// Phone
const phoneCmd = program.command('phone').description('Phone finder');
phoneCmd.addCommand(phoneFind);
phoneCmd.addCommand(phoneGet);
phoneCmd.addCommand(phoneFindBulk);
phoneCmd.addCommand(phoneGetBulk);

// Reverse
const reverseCmd = program.command('reverse').description('Reverse email lookup');
reverseCmd.addCommand(reverseFind);
reverseCmd.addCommand(reverseGet);
reverseCmd.addCommand(reverseFindBulk);
reverseCmd.addCommand(reverseGetBulk);

// Account
const accountCmd = program.command('account').description('Account info');
accountCmd.addCommand(infoCommand);

program.parse();
