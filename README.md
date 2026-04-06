# Enrow CLI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/EnrowAPI/enrow-cli)](https://github.com/EnrowAPI/enrow-cli)
[![Last commit](https://img.shields.io/github/last-commit/EnrowAPI/enrow-cli)](https://github.com/EnrowAPI/enrow-cli/commits)

Find and verify professional emails and phone numbers from your terminal.

## Install

```bash
npm install -g @enrow/cli
```

## Setup

```bash
enrow config set-key YOUR_API_KEY
# or use env var
export ENROW_API_KEY=your_api_key
```

## Email Finder

```bash
enrow email find --domain apple.com --first Tim --last Cook
enrow email find --domain apple.com --first Tim --last Cook --wait
enrow email get search_abc123
enrow email find-bulk --file contacts.csv
enrow email get-bulk batch_xyz --format csv
```

## Email Verifier

```bash
enrow verify single --email tcook@apple.com
enrow verify get verify_abc123
enrow verify bulk --file emails.txt
enrow verify get-bulk batch_xyz
```

## Phone Finder

```bash
enrow phone find --linkedin https://linkedin.com/in/timcook
enrow phone find --first Tim --last Cook --domain apple.com --wait
enrow phone get phone_abc123
enrow phone find-bulk --file contacts.csv
enrow phone get-bulk batch_xyz
```

## Account

```bash
enrow account info
enrow account info --format table
```

## Output formats

```bash
enrow email find --domain apple.com --first Tim --last Cook --format json   # default
enrow email find --domain apple.com --first Tim --last Cook --format table
enrow email find --domain apple.com --first Tim --last Cook --format csv
```

## CSV input

For bulk commands, provide a CSV with the expected columns:

**Email finder** (`--file contacts.csv`):
```
company_domain,first_name,last_name
apple.com,Tim,Cook
microsoft.com,Satya,Nadella
```

**Email verifier** (`--file emails.txt`):
```
tcook@apple.com
snadella@microsoft.com
```

## Credits

| Endpoint | Cost |
|----------|------|
| Email Finder | 1 credit/email |
| Email Verifier | 0.25 credit/email |
| Phone Finder | 50 credits/phone |

## Links

- [API Documentation](https://docs.enrow.io)
- [Enrow](https://enrow.io)

## License

MIT
