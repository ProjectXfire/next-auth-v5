export const envs = {
  githubClientId: process.env.GITHUB_CLIENT_ID ?? '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  webUrl: process.env.WEB_URL ?? '',
  mailerEmail: process.env.MAILER_EMAIL ?? '',
  mailerSecret: process.env.MAILER_SECRET_KEY ?? '',
  mailerService: process.env.MAILER_SERVICE ?? '',
};
