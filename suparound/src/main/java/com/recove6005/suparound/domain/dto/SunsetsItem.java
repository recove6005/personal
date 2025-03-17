package com.recove6005.suparound.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SunsetsItem {
    public String location;
    public String sunrise;
    public String sunset;
    public String moonrise;
    public String moonset;
    public double latitude;
    public double longitude;

    @Override
    public String toString() {
        return "SunsetsItem{" +
                "location='" + location + '\'' +
                ", sunrise='" + sunrise + '\'' +
                ", sunset='" + sunset + '\'' +
                ", moonrise='" + moonrise + '\'' +
                ", moonset='" + moonset + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
