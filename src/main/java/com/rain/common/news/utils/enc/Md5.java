package com.rain.common.news.utils.enc;

import java.security.MessageDigest;

/**
 * @author Rain
 */
public class Md5 {

    /**
     * 全局数组
     */
    private final static String[] strDigits = { "0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };

    /**
     * salt
     */
    private final static String salt = "@news!";

    public Md5() {
    }

    /**
     * 返回形式为数字和字符串
     * @param bByte
     * @return
     */
    private static String byteToArrayString(byte bByte) {
        int iRet = bByte;
        if (iRet < 0) {
            iRet += 256;
        }
        int iD1 = iRet / 16;
        int iD2 = iRet % 16;
        return strDigits[iD1] + strDigits[iD2];
    }
    /**
     *  转换字节数组为16进制字串
     * @param bByte
     * @return
     */
    private static String byteToString(byte[] bByte) {
        StringBuffer sBuffer = new StringBuffer();
        for (int i = 0; i < bByte.length; i++) {
            sBuffer.append(byteToArrayString(bByte[i]));
        }
        return sBuffer.toString();
    }

    /**
     * 将给定的字符串经过md5加密后返回
     * @param str
     * @return
     */
    public static String getMd5Code(String str) {
        String resultString = null;
        try {
            //将给定字符串追加一个静态字符串，以提高复杂度
            resultString = new String(str);
            MessageDigest md = MessageDigest.getInstance("MD5");
            // md.digest() 该函数返回值为存放哈希值结果的byte数组
            resultString = byteToString(md.digest(resultString.getBytes()));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return resultString;
    }

    /**
     * 将给定的字符串经过md5加密后返回
     * @param str
     * @return
     */
    public static String getMd5CodeWithSalt(String str, String salt) {
        return getMd5Code(str+salt);
    }

}
