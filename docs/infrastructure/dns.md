# DNS

Every [domain](/projects/overview.md) should have:

| Host | Type  | MX | Destination | Purpose                                     |
|:-----|:------|----|-------------|---------------------------------------------|
| @    | A     |    | [ip]        | Root domain (explicitly listed)             |
| www  | CNAME |    | [domain]    | Redirects www subdomain (explicitly listed) |
| *    | A     |    | [ip]        | All other subdomains                        |

If the domain has emails, it also needs:

| Host   | Type   | MX | Destination      | Purpose                       |
|:-------|:-------|----|------------------|-------------------------------|
| @      | MX     | 10 | mail.[domain]    | Receiving emails              |
| mail   | A      |    | [ip]             | Subdomain (explicitly listed) |
| imap   | A      |    | [ip]             | Subdomain (explicitly listed) |
| smtp   | A      |    | [ip]             | Subdomain (explicitly listed) |
| @      | TXT    |    | v=spf1 mx ~all   | DMARC                         |
| _dmarc | TXT    |    | v=DMARC1; p=none | SPF                           |
