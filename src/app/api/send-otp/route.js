import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export async function POST(request) {
	const { phoneNumber } = await request.json();

	// Generate a random OTP
	const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

	// Store OTP temporarily (in database or in-memory store like Redis)
	// For simplicity, using in-memory store here
	global.otpStore = global.otpStore || {};
	global.otpStore[phoneNumber] = otp;

	try {
		// Send OTP via Twilio
		await twilioClient.messages.create({
			body: `Your OTP is: ${otp}`,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: phoneNumber,
		});

		return new Response(
			JSON.stringify({ success: true, message: "OTP sent successfully" }),
			{
				status: 200,
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{
				status: 500,
			}
		);
	}
}
