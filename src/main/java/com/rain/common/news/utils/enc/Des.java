package com.rain.common.news.utils.enc;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * @author Rain
 */
public class Des {

    public static final String PASSWORD_CRYPT_KEY = "12345678";


    private static byte[] iv = { 1, 2, 3, 4, 5, 6, 7, 8 };

    /**
     *
     * @param encryptString
     * @param encryptKey
     * @return
     * @throws Exception
     */
    public static String encryptDes(String encryptString, String encryptKey)
            throws Exception {
        IvParameterSpec zeroIv = new IvParameterSpec(iv);
        SecretKeySpec key = new SecretKeySpec(encryptKey.getBytes(), "DES");
        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);
        byte[] encryptedData = cipher.doFinal(encryptString.getBytes());
        return Base64.encodeBase64String(encryptedData);
    }

    /**
     *
     * @param decryptString
     * @param decryptKey
     * @return
     * @throws Exception
     */
    public static String decryptDes(String decryptString, String decryptKey)
            throws Exception {
        byte[] byteMi = Base64.decodeBase64(decryptString);
        IvParameterSpec zeroIv = new IvParameterSpec(iv);
        SecretKeySpec key = new SecretKeySpec(decryptKey.getBytes(), "DES");
        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, key, zeroIv);
        byte decryptedData[] = cipher.doFinal(byteMi);
        return new String(decryptedData);
    }

}
