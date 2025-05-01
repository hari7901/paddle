// app/lib/email.ts
import { SendMailClient, SendMailOptions } from "zeptomail";

const mailClient = new SendMailClient({
  url: process.env.ZEPTO_URL!, // e.g. "https://api.zeptomail.in/"
  token: process.env.ZEPTO_TOKEN!, // your Zoho-enczapikey token
});

export interface BookingEmailParams {
  bookingId: string;
  courtName: string;
  courtType: string;
  date: string;
  times: string[];
  slotIds: string[];
  price: number;
  name: string;
  email: string;
  phone: string;
  supportPhone: string;
}

// Send via ZeptoMail
async function sendEmail(options: SendMailOptions) {
  return mailClient.sendMail(options);
}

// Your public base URL for links (ensure NEXT_PUBLIC_BASE_URL is set)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://proyard.in";

function buildHtmlBody(isAdmin: boolean, params: BookingEmailParams) {
  const {
    bookingId,
    courtName,
    courtType,
    date,
    times,
    slotIds,
    price,
    name,
    supportPhone,
  } = params;
  const formattedTimes = times.join(", ");
  const formattedSlots = slotIds.join(", ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${
    isAdmin ? "New Booking Notification" : "Booking Confirmation"
  }</title>
  <style>
    body,table,td,a{ -webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
    table{ border-collapse:collapse!important; }
    img{ border:0;height:auto;line-height:100%;outline:none;text-decoration:none;}
    body{ margin:0!important;padding:0!important;width:100%!important;background:#f4f4f7;}
    @media screen and (max-width:600px){
      .container{ width:100%!important; }
      .padding{ padding:10px!important; }
    }
  </style>
</head>
<body style="background-color:#f4f4f7; margin:0; padding:20px;">
  <table class="container" align="center" width="600" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;">
    <tr>
      <td style="padding:30px;">
        <h1 style="font-family:Arial,sans-serif; color:#333; margin-top:0;">
          ${isAdmin ? "🎯 New Booking Received" : "🎾 Booking Confirmed!"}
        </h1>
        <p style="font-family:Arial,sans-serif; color:#555;">
          ${
            isAdmin
              ? `A new booking was made on <strong>${date}</strong>.`
              : `Hi <strong>${name}</strong>, your booking on <strong>${date}</strong> is confirmed!`
          }
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif; color:#555; border:1px solid #ddd; border-radius:4px; margin-top:20px;">
          <tr style="background:#f9f9f9;">
            <th align="left" style="padding:12px; border-bottom:1px solid #ddd;">Court</th>
            <td style="padding:12px; border-bottom:1px solid #ddd;">${courtName} (${courtType})</td>
          </tr>
          <tr>
            <th align="left" style="padding:12px; border-bottom:1px solid #ddd;">Date & Time</th>
            <td style="padding:12px; border-bottom:1px solid #ddd;">${date}, ${formattedTimes}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <th align="left" style="padding:12px; border-bottom:1px solid #ddd;">Slots</th>
            <td style="padding:12px; border-bottom:1px solid #ddd;">${formattedSlots}</td>
          </tr>
          <tr>
            <th align="left" style="padding:12px;">Total Paid</th>
            <td style="padding:12px;">₹${price}</td>
          </tr>
        </table>

        ${
          !isAdmin
            ? `
        <p style="font-family:Arial,sans-serif; color:#555; margin-top:20px;">
          For any questions, call us at <strong>${supportPhone}</strong>.
        </p>
        `
            : `
        <p style="font-family:Arial,sans-serif; color:#555; margin-top:20px;">
          <a href="${baseUrl}/admin/bookings" style="color:#0070f3;">View all bookings</a>
        </p>
        `
        }

        <hr style="border:none; border-top:1px solid #eee; margin:30px 0;">

        <p style="font-family:Arial,sans-serif; color:#999; font-size:12px; line-height:1.4;">
          This is an auto-generated email; please do not reply.<br>
          © 2025 Proyard Padel.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendAdminNotification(params: BookingEmailParams) {
  const htmlbody = buildHtmlBody(true, params);
  await sendEmail({
    from: { address: "noreply@proyard.in", name: "Proyard Padel" },
    to: [
      { email_address: { address: process.env.ADMIN_EMAIL!, name: "Admin" } },
    ],
    subject: `New booking: ${params.courtName} on ${params.date}`,
    htmlbody,
  });
}

export async function sendCustomerConfirmation(params: BookingEmailParams) {
  const htmlbody = buildHtmlBody(false, params);
  await sendEmail({
    from: { address: "noreply@proyard.in", name: "Proyard Padel" },
    to: [{ email_address: { address: params.email, name: params.name } }],
    subject: `Your booking is confirmed: ${params.courtName} on ${params.date}`,
    htmlbody,
  });
}
