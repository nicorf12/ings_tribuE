FROM openjdk:21-jdk-slim

RUN ./gradlew build -x test

COPY demo/build/libs/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]