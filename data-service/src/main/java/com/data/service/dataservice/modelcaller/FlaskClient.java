package com.data.service.dataservice.modelcaller;

import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class FlaskClient {

    public static JSONObject sendPostRequest(JSONObject inputJson) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://34.247.13.235:5000/predict")) // Change URL if needed
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(inputJson.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return new JSONObject(response.body());
    }

    public static void main(String[] args) {
        try {
            JSONObject sampleInput = new JSONObject();
            sampleInput.put("timestamp", 1720742400);
            sampleInput.put("park_id", "PK101");

            JSONObject prediction = sendPostRequest(sampleInput);
            System.out.println("Prediction: " + prediction);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
