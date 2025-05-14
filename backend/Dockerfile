FROM maven:3.8.4-openjdk-17 as builder

WORKDIR /app

COPY pom.xml .
COPY src /app/src

COPY target/*.jar app.jar

RUN mvn clean install

FROM openjdk:17-jdk-slim

COPY --from=builder /app/target/app.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
