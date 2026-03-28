package com.app.intellicart.service;

import com.app.intellicart.dto.model.ModelPredictionRequest;
import com.app.intellicart.dto.model.ModelPredictionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final RestTemplate restTemplate;

    private static final String MODEL_SERVER_URL = "http://localhost:8000/predict";

    public ModelPredictionResponse getPrediction(ModelPredictionRequest requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ModelPredictionRequest> requestEntity =
                new HttpEntity<>(requestDto, headers);

        ResponseEntity<ModelPredictionResponse> response = restTemplate.exchange(
                MODEL_SERVER_URL,
                HttpMethod.POST,
                requestEntity,
                ModelPredictionResponse.class
        );

        return response.getBody();
    }
}