FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/calendar-service-0.0.1-SNAPSHOT.jar calendar-service-0.0.1-SNAPSHOT.jar
EXPOSE 8084
CMD ["java","-jar","calendar-service-0.0.1-SNAPSHOT.jar"]