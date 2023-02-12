<br/><br/>
![](./public/img/thin.png)
<br/><br/>

### Installation

1. Clone the repository `git clone https://github.com/Pulsar-Dev/verify`
2. Install packages `pnpm install`
3. Create the .env using `.env.example` as a template
   - **Discord**: https://discord.com/developers/applications
     - `DISCORD_CLIENT_ID` is the client ID of your application
     - `DISCORD_CLIENT_SECRET` is the client secret of your application
     - `DISCORD_REDIRECT_URI` same as `APP_URL` with `/discord` after. Make sure to add redirects in OAuth2 -> General.
     - `NEXT_PUBLIC_DISCORD_SIGNIN` found in OAuth2 -> URL Generator. Make sure to enable the scopes `identify` and `connections`
   - `GMODSTORE_TOKEN` your GmodStore Access Token. Needs Scopes: `users:read` and `user-purchases:read`
   - `PULSAR_GUILD` your Discord guild ID
   - `PULSAR_TOKEN` your Discord bot token
   - `DATABASE_URL` your MySQL database URL `"mysql://username:password@ip:port/database"`
4. Edit `ids.json` to your liking
5. Run `pnpm build` to build the project
6. Run `pnpm start` to start the project
7. Navigate to `APP_URL` in your browser
8. Profit
