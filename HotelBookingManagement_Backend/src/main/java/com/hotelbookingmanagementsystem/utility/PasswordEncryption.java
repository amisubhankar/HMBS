package com.hotelbookingmanagementsystem.utility;

import java.math.BigInteger;
import java.security.MessageDigest;

public class PasswordEncryption {
	private PasswordEncryption() {
		
	}

	public static String md5(String input) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] messageDigest = md.digest(input.getBytes());
			BigInteger number = new BigInteger(1, messageDigest);
			StringBuilder hashtext = new StringBuilder(number.toString(16));
			while (hashtext.length() < 32) {
				hashtext.insert(0, "0");
			}
			return hashtext.toString();
		} catch (Exception e) {
			return " ";
		}
	}

}
