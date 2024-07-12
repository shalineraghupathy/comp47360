package com.calendar.service.calendarservice.service;

import com.calendar.service.calendarservice.entity.Event;
import com.calendar.service.calendarservice.util.DateUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ApiService {

    @Autowired
    private EventService eventService;

    @Autowired
    private DailyEventService dailyEventService;

    @Value("${api.url}")
    private String apiUrl;

    @Value("${api.key}")
    private String apiKey;

    // private static final HashSet<String> testSet = new HashSet<>();

    @Scheduled(fixedRate = 7 * 86400 * 1000)
    public void fetchAndSaveEvents() {
        Set<Event> allEventFetched = getFutureDates(30).stream().map(this::fetchEventsByDate).flatMap(Set::stream).collect(Collectors.toSet());
        eventService.saveEvents(allEventFetched);
        dailyEventService.refreshDailyEventIdMap();
    }

    private Set<Event> fetchEventsByDate(String date) {
        final OkHttpClient httpClient = new OkHttpClient();

        HttpUrl.Builder urlBuilder = HttpUrl.parse(apiUrl).newBuilder();
        urlBuilder.addQueryParameter("category", "festivals,concerts,expos,community,sports,performing-arts,conferences");
        urlBuilder.addQueryParameter("within", "2km@40.782668404628964,-73.96561559006595");// 2km within Central Park center point
        urlBuilder.addQueryParameter("active.lte", date);
        urlBuilder.addQueryParameter("active.gte", date);

        Request request = new Request.Builder()
                .url(urlBuilder.build())
                .addHeader("Authorization", "Bearer " + apiKey)
                .addHeader("Accept", "application/json")
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }

            // Parse the response
            JsonObject jsonResponse = JsonParser.parseString(response.body().string()).getAsJsonObject();

            // 使用ObjectMapper从JSON解析到Event对象
            ObjectMapper objectMapper = new ObjectMapper();
            HashSet<Event> events = new HashSet<>();
            JsonNode resultsNode = objectMapper.readTree(jsonResponse.toString()).path("results");

            for (Iterator<JsonNode> it = resultsNode.elements(); it.hasNext(); ) {
                JsonNode node = it.next();
                Event event = new Event();
                event.setId(node.path("id").asText());
                event.setTitle(node.path("title").asText());
                event.setCategory(node.path("category").asText());
                event.setLabels(node.path("labels").toString());
                event.setStartLocal(LocalDateTime.parse(node.path("start_local").asText()));
                event.setEndLocal(LocalDateTime.parse(node.path("end_local").asText()));
                event.setLongitude(node.path("location").get(0).asDouble());
                event.setLatitude(node.path("location").get(1).asDouble());
                event.setAddress(node.path("geo").path("address").path("formatted_address").asText());
                event.setDescription(node.path("description").asText());
                events.add(event);
            }

            // events.forEach(event -> testSet.add(event.getId()));
            return events;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static List<String> getFutureDates(int i) {
        return DateUtils.getDatesFromNow(0, i).stream().map(LocalDate::toString).collect(Collectors.toList());
    }
}
