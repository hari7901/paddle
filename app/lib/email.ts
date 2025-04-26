import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or any SMTP service
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_APP_PASSWORD,
  },
});

export async function sendBookingAlert(booking: {
  _id: string;
  name: string;
  email: string;
  phone: string;
  courtName: string;
  courtType: string;
  price: number;
  date: string;
  time: string;
}) {
  await transporter.sendMail({
    from: `"Court Booker" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🟢 New booking – ${booking.courtName} on ${booking.date} at ${booking.time}`,
    html: `
      <h2>New Booking</h2>
      <ul>
        <li><b>Ref:</b> ${booking._id}</li>
        <li><b>Name:</b> ${booking.name}</li>
        <li><b>Email:</b> ${booking.email}</li>
        <li><b>Phone:</b> ${booking.phone}</li>
        <li><b>Court:</b> ${booking.courtName} (${booking.courtType})</li>
        <li><b>Date:</b> ${booking.date}</li>
        <li><b>Time:</b> ${booking.time}</li>
        <li><b>Price:</b> ₹${booking.price}</li>
      </ul>
    `,
  });
}
