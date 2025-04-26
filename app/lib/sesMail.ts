import {
  SESv2Client,
  SendEmailCommand,
  SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";

const client = new SESv2Client({
  region: process.env.AWS_SES_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
});

type BookingData = {
  _id: string;
  name: string;
  email: string; // may be empty – we guard later
  courtName: string;
  courtType: string;
  date: string;
  time: string;
  price: number;
};

export async function sendCustomerEmail(b: BookingData) {
  if (!b.email) return; // skip when e-mail not provided

  const html = `
  <h2>Booking Confirmed ✅</h2>
  <p>Hi ${b.name || "player"},</p>
  <p>Your court booking is confirmed.</p>
  <ul>
    <li><b>Reference:</b> ${b._id}</li>
    <li><b>Court:</b> ${b.courtName} (${b.courtType})</li>
    <li><b>Date:</b> ${b.date}</li>
    <li><b>Time:</b> ${b.time}</li>
    <li><b>Amount:</b> ₹${b.price}</li>
  </ul>
  <p>Please arrive 15 minutes early. See you on court!</p>`;

  const params: SendEmailCommandInput = {
    FromEmailAddress: process.env.SES_FROM_ADDR!,
    Destination: { ToAddresses: [b.email] },
    Content: {
      Simple: {
        Subject: { Data: "Your Court Booking is Confirmed" },
        Body: {
          Html: { Data: html },
          Text: {
            Data:
              `Booking Confirmed\n\nRef: ${b._id}\nCourt: ${b.courtName}` +
              ` (${b.courtType})\nDate: ${b.date}\nTime: ${b.time}\n` +
              `Amount: ₹${b.price}\n\nPlease arrive 15 minutes early.`,
          },
        },
      },
    },
  };

  await client.send(new SendEmailCommand(params));
}
