package com.recove6005.suparound.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Service
public class BoxOfficeService {
    private final String API_KEY = "e2a5cac3e86073dedf138ebc2d8d62ba";
    private final String API_URL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";

    public ArrayList<String> getDailyBoxOfficeTitleList() {
        RestTemplate restTemplate = new RestTemplate();
        String targetDate = LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("key", API_KEY)
                .queryParam("targetDt", targetDate)
                .queryParam("repNationCd", 'F')
                .toUriString();

        String response = restTemplate.getForObject(url, String.class);
        try {
            JSONObject jsonObject = new JSONObject(response);
            JSONArray boxofficeList = jsonObject.getJSONObject("boxOfficeResult").getJSONArray("dailyBoxOfficeList");

            ArrayList titleList = new ArrayList();

            for(int i = 0; i < boxofficeList.length(); i++) {
                JSONObject boxoffice = boxofficeList.getJSONObject(i);
                String title = boxoffice.getString("movieNm");
                titleList.add(title);
            }

            return titleList;
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    public ArrayList<String> getDailyBoxOfficeAudiaccList() {
        RestTemplate restTemplate = new RestTemplate();
        String targetDate = LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("key", API_KEY)
                .queryParam("targetDt", targetDate)
                .queryParam("repNationCd", 'F')
                .toUriString();

        String response = restTemplate.getForObject(url, String.class);
        try {
            JSONObject jsonObject = new JSONObject(response);
            JSONArray boxofficeList = jsonObject.getJSONObject("boxOfficeResult").getJSONArray("dailyBoxOfficeList");

            ArrayList audiaccList = new ArrayList();

            for(int i = 0; i < boxofficeList.length(); i++) {
                JSONObject boxoffice = boxofficeList.getJSONObject(i);
                String acc = boxoffice.getString("audiAcc");
                audiaccList.add(acc);
            }

            return audiaccList;
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
