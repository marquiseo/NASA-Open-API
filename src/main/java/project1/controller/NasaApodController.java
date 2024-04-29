package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project1.domain.ApodResponse;
import project1.service.NasaApodService;

import java.util.List;

@RestController
@RequestMapping("/api/nasa/apod")
public class NasaApodController {

    private final NasaApodService nasaApodService;

    @Autowired
    public NasaApodController(NasaApodService nasaApodService) {
        this.nasaApodService = nasaApodService;
    }

    @GetMapping("/current")
    public ResponseEntity<ApodResponse> getCurrentApod() {
        ApodResponse apodResponse = nasaApodService.getCurrentApod();
        return apodResponse != null ? ResponseEntity.ok(apodResponse) : ResponseEntity.notFound().build();
    }

    @GetMapping("/query")
    public ResponseEntity<List<ApodResponse>> queryApod(@RequestParam(required = false) String date,
                                                        @RequestParam(required = false) String start_date,
                                                        @RequestParam(required = false) String end_date,
                                                        @RequestParam(required = false) Integer count,
                                                        @RequestParam(required = false) Boolean thumbs) {
        List<ApodResponse> apodResponses = nasaApodService.queryApod(date, start_date, end_date, count, thumbs);
        return apodResponses != null && !apodResponses.isEmpty() ? ResponseEntity.ok(apodResponses) : ResponseEntity.notFound().build();
    }
}



