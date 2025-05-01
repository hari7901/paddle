import { SendMailClient, SendMailOptions } from "zeptomail";

const mailClient = new SendMailClient({
  url: process.env.ZEPTO_URL!,
  token: process.env.ZEPTO_TOKEN!,
});

export async function sendEmail(options: SendMailOptions) {
  return mailClient.sendMail(options);
}

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
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://proyard.in";

function buildHtmlBody(isAdmin: boolean, params: BookingEmailParams) {
  const { bookingId, courtName, courtType, date, times, slotIds, price, name } =
    params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${isAdmin ? "New Booking" : "Booking Confirmed"}</title>
  <style>
    body,table,td,a{ -webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
    table{ border-collapse:collapse!important; }
    img{ border:0;height:auto;line-height:100%;outline:none;text-decoration:none;}
    body{ margin:0!important;padding:0!important;width:100%!important;background:#f4f4f7;}
    @media screen and (max-width:600px){
      .responsive-table{ width:100%!important;}
      .padding{ padding:10px!important;}
    }
  </style>
</head>
<body>
  <table width="100%" bgcolor="#f4f4f7" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:20px;">
      <table class="responsive-table" width="600" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;">
        
        <!-- Title -->
        <tr><td align="center" style="padding:30px 30px 20px;">
          <h1 style="font-family:Helvetica,Arial,sans-serif;font-size:24px;color:#333;margin:0;">
            ${isAdmin ? "🎯 New Booking Received" : "🎾 Booking Confirmed!"}
          </h1>
        </td></tr>
        
        <!-- Intro -->
        <tr><td class="padding" style="padding:0 30px 20px;">
          <p style="font-family:Helvetica,Arial,sans-serif;font-size:16px;color:#555;margin:0;">
            ${
              isAdmin
                ? `A new booking was made on <strong>${date}</strong>.`
                : `Hi <strong>${name}</strong>, your booking on <strong>${date}</strong> is confirmed!`
            }
          </p>
        </td></tr>
        
        <!-- Details Table -->
        <tr><td class="padding" style="padding:0 30px 30px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Helvetica,Arial,sans-serif;color:#555;border:1px solid #e0e0e0;border-radius:4px;">
            <tr style="background:#fafafa;">
              <th align="left" style="padding:12px;border-bottom:1px solid #e0e0e0;">Court</th>
              <td style="padding:12px;border-bottom:1px solid #e0e0e0;">${courtName} (${courtType})</td>
            </tr>
            <tr>
              <th align="left" style="padding:12px;border-bottom:1px solid #e0e0e0;">Date & Time</th>
              <td style="padding:12px;border-bottom:1px solid #e0e0e0;">${date}, ${times.join(
    ", "
  )}</td>
            </tr>
            <tr style="background:#fafafa;">
              <th align="left" style="padding:12px;border-bottom:1px solid #e0e0e0;">Slots</th>
              <td style="padding:12px;border-bottom:1px solid #e0e0e0;">${slotIds.join(
                ", "
              )}</td>
            </tr>
            <tr>
              <th align="left" style="padding:12px;">Total Paid</th>
              <td style="padding:12px;">₹${price}</td>
            </tr>
          </table>
        </td></tr>
        
        <!-- Support / Admin link -->
        <tr><td class="padding" style="padding:0 30px 30px;">
          <p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#888;margin:0;">
            ${
              isAdmin
                ? `Admin dashboard: <a href="${baseUrl}/admin/bookings" style="color:#0070f3;">View All Bookings</a>`
                : `For help, call <strong>+91 90410 13409</strong> or email <a href="mailto:proplaysports032@gmail.com">proplaysports032@gmail.com</a>.`
            }
          </p>
        </td></tr>
        
      </table>
    </td></tr>
    
    <!-- Disclaimer & Footer -->
    <tr><td align="center" style="padding:20px;">
      <p style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#aaa;margin:0;">
        This is an auto-generated email; please do not reply.<br>
        © 2025 Proyard Padel. All rights reserved.<br>
        <a href="${baseUrl}/unsubscribe" style="color:#aaa;text-decoration:underline;">Unsubscribe</a>
      </p>
    </td></tr>
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
