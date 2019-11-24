package com.rain.common.news.utils.enc;


import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

/**
 * @author Rain
 */
public class Aes {

    /**
     *
     */
    private static final String IV_STRING = "A-16-Byte-String";

    /**
     *
     */
    private static final String charset = "UTF-8";

    /**
     *
     */
    private static final String salt = "@news!NEWS@News!";

    /**
     *
     * @param content
     * @param key
     * @return
     * @throws Exception
     */
    public static String aesEncryptString(String content, String key) throws Exception {
        byte[] contentBytes = content.getBytes(charset);
        byte[] keyBytes = key.getBytes(charset);
        byte[] encryptedBytes = aesEncryptBytes(contentBytes, keyBytes);
        Base64.Encoder encoder = Base64.getEncoder();
        return encoder.encodeToString(encryptedBytes);
    }

    /**
     *
     * @param content
     * @return
     * @throws Exception
     */
    public static String aesDecryptString(String content) throws Exception {
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] encryptedBytes = decoder.decode(content);
        byte[] keyBytes = salt.getBytes(charset);
        byte[] decryptedBytes = aesDecryptBytes(encryptedBytes, keyBytes);
        return new String(decryptedBytes, charset);
    }

    /**
     *
     * @param content
     * @return
     * @throws Exception
     */
    public static String aesEncryptString(String content) throws Exception {
        byte[] contentBytes = content.getBytes(charset);
        byte[] keyBytes = salt.getBytes(charset);
        byte[] encryptedBytes = aesEncryptBytes(contentBytes, keyBytes);
        Base64.Encoder encoder = Base64.getEncoder();
        return encoder.encodeToString(encryptedBytes);
    }

    /**
     *
     * @param content
     * @param key
     * @return
     * @throws Exception
     */
    public static String aesDecryptString(String content, String key) throws Exception {
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] encryptedBytes = decoder.decode(content);
        byte[] keyBytes = key.getBytes(charset);
        byte[] decryptedBytes = aesDecryptBytes(encryptedBytes, keyBytes);
        return new String(decryptedBytes, charset);
    }

    /**
     *
     * @param contentBytes
     * @param keyBytes
     * @return
     * @throws Exception
     */
    public static byte[] aesEncryptBytes(byte[] contentBytes, byte[] keyBytes) throws Exception {
        return cipherOperation(contentBytes, keyBytes, Cipher.ENCRYPT_MODE);
    }

    /**
     *
     * @param contentBytes
     * @param keyBytes
     * @return
     * @throws Exception
     */
    public static byte[] aesDecryptBytes(byte[] contentBytes, byte[] keyBytes) throws Exception {
        return cipherOperation(contentBytes, keyBytes, Cipher.DECRYPT_MODE);
    }

    /**
     *
     * @param contentBytes
     * @param keyBytes
     * @param mode
     * @return
     * @throws Exception
     */
    private static byte[] cipherOperation(byte[] contentBytes, byte[] keyBytes, int mode) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");

        byte[] initParam = IV_STRING.getBytes(charset);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(initParam);

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(mode, secretKey, ivParameterSpec);

        return cipher.doFinal(contentBytes);
    }

}
