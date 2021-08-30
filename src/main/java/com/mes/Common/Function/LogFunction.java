package com.mes.Common.Function;

import com.mes.Common.Interceptor.Session;
import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Date;

public class LogFunction extends ReturnFunction {

    public static String getClientIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");


        if (ip == null) {
            ip = request.getHeader("Proxy-Client-IP");

        }
        if (ip == null) {
            ip = request.getHeader("WL-Proxy-Client-IP");

        }
        if (ip == null) {
            ip = request.getHeader("HTTP_CLIENT_IP");

        }
        if (ip == null) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");

        }
        if (ip == null) {
            ip = request.getRemoteAddr();

        }


        return ip;
    }


    public void apiLogSend(HttpSession session,String text) throws UnsupportedEncodingException {
        Session userData = (Session) session.getAttribute("userData");

//        System.out.println(userData.getUser_name());
//        System.out.println(userData.getIp());
        Date date_now = new Date(System.currentTimeMillis());
        SimpleDateFormat fourteen_format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
//        System.out.println(fourteen_format.format(date_now));


        String openApiURL = "https://log.smart-factory.kr/apisvc/sendLogData.json";
        MultipartEntity builder = new MultipartEntity();

        StringBody comment = new StringBody("$5$API$Tve3blQu9xBGKzAoSsBqeopPWNRR4iDMr./5mVuA1C3",Charset.forName("UTF-8"));
        StringBody comment2 = new StringBody(fourteen_format.format(date_now),Charset.forName("UTF-8"));
        StringBody comment3 = new StringBody(text,Charset.forName("UTF-8"));
        StringBody comment4 = new StringBody(userData.getUser_name(),Charset.forName("UTF-8"));
//        StringBody comment4 = new StringBody("테스트");
        StringBody comment5 = new StringBody(userData.getIp(),Charset.forName("UTF-8"));
        StringBody comment6 = new StringBody("0",Charset.forName("UTF-8"));
        builder.addPart("crtfcKey", comment);
        builder.addPart("logDt", comment2);
        builder.addPart("useSe", comment3);
        builder.addPart("sysUser", comment4);
        builder.addPart("conectIp", comment5);
        builder.addPart("dataUsgqty", comment6);

        Integer responseCode = null;
        String responBody = null;
        try {
            CloseableHttpClient http = HttpClients.createDefault();
            HttpPost post = new HttpPost(openApiURL);
            post.setEntity(builder);
            CloseableHttpResponse response = http.execute(post);
            StatusLine status;
            try {
                StringBuffer result = new StringBuffer();
                status = response.getStatusLine();
                HttpEntity res = response.getEntity();
                BufferedReader br = new BufferedReader(new InputStreamReader(res.getContent(), Charset.forName("UTF-8")));

                String buffer = null;
                while ((buffer = br.readLine()) != null) {
                    result.append(buffer).append("\r\n");
                }

                responseCode = status.getStatusCode();
                responBody = result.toString();
            } finally {
                response.close();
            }

//            System.out.println("[responseCode] " + responseCode);
//            System.out.println("[responBody]");
//            System.out.println(responBody);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
