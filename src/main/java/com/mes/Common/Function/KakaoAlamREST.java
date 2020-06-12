package com.mes.Common.Function;

import com.mes.Common.DataTransferObject.KakaoAlam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
public class KakaoAlamREST {
    @RequestMapping("sendmsg")
    public void SendMessage(KakaoAlam kakao, HttpServletResponse response) throws IOException {
        System.out.println(kakao.getTmp_number());
        URL url = null;
        HttpURLConnection connection = null;
        InputStream input = null;
        OutputStream output = null;
        ByteArrayOutputStream results = null;
        String parameters = "";
        byte[] buffer = new byte[2048];
        int readed = 0;
        try {
            parameters = parameters + "{  \"tmp_number\": \"" + kakao.getTmp_number() + "\",  \"kakao_res\": \"" + kakao.getKakao_res().trim() + "\",  \"kakao_url\": null,  \"kakao_sender\": \"" + kakao.getKakao_sender().trim() + "\",  \"kakao_name\": \"" + kakao.getKakao_name() + "\",  \"kakao_phone\": \"" + kakao.getKakao_phone().trim() + "\",  \"kakao_add1\": \"" + kakao.getKakao_add1() + "\",  \"kakao_add2\": \"" + kakao.getKakao_add2() + "\",  \"kakao_add3\": \"" + kakao.getKakao_add3() + "\",  \"kakao_add4\": \"" + kakao.getKakao_add4() + "\",  \"kakao_add5\": \"" + kakao.getKakao_add5() + "\",  \"kakao_add6\": \"" + kakao.getKakao_add6() + "\",  \"kakao_add7\": \"" + kakao.getKakao_add7() + "\",  \"kakao_add8\": \"" + kakao.getKakao_add8() + "\",  \"kakao_add9\": \"" + kakao.getKakao_add9() + "\",  \"kakao_add10\": \"" + kakao.getKakao_add10() + "\",  \"kakao_080\": \"N\",  \"kakao_url1_1\": null,  \"kakao_url1_2\": null,  \"kakao_url2_1\": null,  \"kakao_url2_2\": null,  \"kakao_url3_1\": null,  \"kakao_url3_2\": null,  \"kakao_url4_1\": null,  \"kakao_url4_2\": null,  \"kakao_url5_1\": null,  \"kakao_url5_2\": null,  \"TRAN_REPLACE_TYPE\": \"L\"  }";
            url = new URL("http://www.apiorange.com/api/send/notice.do");
            connection = (HttpURLConnection)url.openConnection();
            connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            connection.setRequestProperty("Authorization", kakao.getAppKey());
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setUseCaches(false);
            connection.setDefaultUseCaches(false);
            output = connection.getOutputStream();
            output.write(parameters.getBytes());
            output.flush();
            input = connection.getInputStream();
            results = new ByteArrayOutputStream();
            for (; (readed = input.read(buffer, 0, buffer.length)) != -1; results.write(buffer, 0, readed));
            response.getWriter().print(parameters.toString());
        } finally {
            if (input != null)
                input.close();
            if (output != null)
                output.close();
            if (results != null)
                results.close();
            if (connection != null)
                connection.disconnect();
        }
    }
}
