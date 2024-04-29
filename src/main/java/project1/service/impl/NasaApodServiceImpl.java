package project1.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import project1.domain.ApodResponse;
import project1.service.NasaApodService;

import java.util.Collections;
import java.util.List;

@Service
public class NasaApodServiceImpl implements NasaApodService {

    @Value("${nasa.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public NasaApodServiceImpl(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public ApodResponse getCurrentApod() {
        String url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
        return restTemplate.getForObject(url, ApodResponse.class);
    }

    @Override
    public List<ApodResponse> queryApod(String date, String start_date, String end_date, Integer count, Boolean thumbs) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl("https://api.nasa.gov/planetary/apod")
                .queryParam("api_key", apiKey);

        if (count != null) {
            uriBuilder.queryParam("count", count);
        } else if (date != null) {
            uriBuilder.queryParam("date", date);
        } else if (start_date != null && end_date != null) {
            uriBuilder.queryParam("start_date", start_date)
                    .queryParam("end_date", end_date);
        }

        if (thumbs != null) {
            uriBuilder.queryParam("thumbs", thumbs);
        }

        String uri = uriBuilder.toUriString();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);

        try {
            if (response.getBody().startsWith("[")) {
                return objectMapper.readValue(response.getBody(), new TypeReference<List<ApodResponse>>(){});
            } else {
                ApodResponse singleResponse = objectMapper.readValue(response.getBody(), ApodResponse.class);
                return Collections.singletonList(singleResponse);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
