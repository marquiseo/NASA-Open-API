package project1.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApodResponse {
    private String date;
    private String explanation;
    private String hdurl;
    private String mediaType;
    private String serviceVersion;
    private String title;
    private String url;
}
