// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SendMailClient } from "zeptomail";

const mailClient = new SendMailClient({
  url: process.env.ZEPTO_URL!,
  token: process.env.ZEPTO_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // send to hariwork79@gmail.com
    await mailClient.sendMail({
      from: { address: "noreply@proyard.in", name: "Proyard Contact Form" },
      to: [
        {
          email_address: {
            address: "proplaysports032@gmail.com",
            name: "Admin",
          },
        },
      ],
      subject: `New contact form submission from ${name}`,
      htmlbody: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="font-size:12px;color:#888;">
          This is an auto-generated email. Please do not reply.
        </p>
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
