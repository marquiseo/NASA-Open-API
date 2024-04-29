package project1.service;

import project1.domain.ApodResponse;

import java.util.List;

public interface NasaApodService {
    ApodResponse getCurrentApod();
    List<ApodResponse> queryApod(String date, String start_date, String end_date, Integer count, Boolean thumbs);
}


