# AWS Deployment Guide — ABC Cleaners

## Recommended: AWS Amplify Hosting

AWS Amplify natively supports Next.js (SSR, API routes, middleware). This is the easiest path.

### Setup Steps

1. **Push to Git** — Push this repo to GitHub, GitLab, or CodeCommit
2. **Create Amplify App** — Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. **Connect Repo** — Select your repo and branch
4. **Amplify auto-detects** the `amplify.yml` build settings
5. **Set Environment Variables** in Amplify Console → App Settings → Environment Variables:

| Variable | Description | Example |
|---|---|---|
| `ADMIN_EMAIL` | Admin login email | `admin@abccleaners.com` |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of admin password | `$2a$12$...` (generate with `npx bcryptjs-cli hash yourpassword`) |
| `JWT_SECRET` | Random 32+ char string for JWT signing | `abc-cleaners-jwt-secret-change-me` |
| `NEXT_PUBLIC_SITE_URL` | Production URL | `https://abccleaners.com` |

6. **Deploy** — Amplify builds and deploys automatically

### Generate Password Hash

```bash
# Install bcryptjs globally to generate hash
npx -y bcryptjs-cli hash "YourSecurePassword123!"
```

Copy the output (starts with `$2a$` or `$2b$`) into the `ADMIN_PASSWORD_HASH` environment variable.

### Custom Domain

1. In Amplify Console → Domain Management → Add Domain
2. Enter `abccleaners.com`
3. Follow DNS verification steps
4. Amplify provisions SSL certificate automatically

## Alternative: AWS App Runner + ECR

For containerized deployment:

```bash
# Build Docker image
docker build -t abc-cleaners .
# Push to ECR and deploy with App Runner
```

You'll need a `Dockerfile` (Next.js standalone output is configured in `next.config.js`).

## DNS / CloudFront Notes

- Amplify automatically sets up CloudFront distribution
- SSL/TLS is provisioned via ACM (free)
- Enable `www` redirect in Amplify domain settings
