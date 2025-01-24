export async function POST(request) {
	const { phoneNumber, otp } = await request.json();

	// Check OTP validity
	if (global.otpStore && global.otpStore[phoneNumber] === parseInt(otp, 10)) {
		// OTP is valid, proceed with login
		// Optionally, create a JWT token for the user
		global.otpStore[phoneNumber] = null; // Clear OTP after verification

		return new Response(
			JSON.stringify({ success: true, message: "OTP verified successfully" }),
			{
				status: 200,
			}
		);
	} else {
		return new Response(
			JSON.stringify({ success: false, message: "Invalid OTP" }),
			{
				status: 400,
			}
		);
	}
}
