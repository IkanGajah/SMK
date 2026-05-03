# Tahap Build (Membuat file .jar)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml dan download dependencies (agar di-cache oleh Docker)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy folder src dan build aplikasinya
COPY src ./src
RUN mvn clean package -DskipTests

# Tahap Run (Menjalankan aplikasi)
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# Copy file .jar dari tahap build sebelumnya
COPY --from=build /app/target/backend-api-0.0.1-SNAPSHOT.jar app.jar

# Expose port yang digunakan Spring Boot
EXPOSE 8080

# Jalankan aplikasinya
ENTRYPOINT ["java", "-jar", "app.jar"]
