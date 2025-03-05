const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
appToken: process.env.SLACK_APP_TOKEN,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
//   logLevel: LogLevel.DEBUG,
});

app.command('/admins', async ({ ack, respond, client }) => {
  const { members } = await client.users.list();
  const admins = members.filter((member) => member.is_admin);

  console.log(`⭐ ${JSON.stringify(admins, null, 2)}`);
  await ack();
  await respond({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `The admins are:\n${admins.map((admin) => `@${admin.name}`).join(", ")}`
        }
      },
    ],
    response_type: "ephemeral",
    // response_type: "in_channel",
  });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000).catch((error) => {
    console.error('An error occurred:', error);
  });

  app.logger.info('⚡️ Bolt app is running!');
})();