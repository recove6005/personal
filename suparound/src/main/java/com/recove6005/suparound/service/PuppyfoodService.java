package com.recove6005.suparound.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class PuppyfoodService {
    private final String API_KEY = "e2a5cac3e86073dedf138ebc2d8d62ba";
    private final String API_URL = "http://api.nongsaro.go.kr/service/feedRawMaterial/upperList";

    public String getPuppyfood() {
        RestTemplate restTemplate = new RestTemplate();
        String targetDate = LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("key", API_KEY)
                .toUriString();

        String response = restTemplate.getForObject(url, String.class);

        return response.toString();
    }
}
