FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/data-service-0.0.1-SNAPSHOT.jar data-service-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java","-jar","data-service-0.0.1-SNAPSHOT.jar"]