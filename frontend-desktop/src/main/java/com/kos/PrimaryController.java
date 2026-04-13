package com.kos;

import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.ResourceBundle;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

public class PrimaryController implements Initializable {

    // 1. Menyambungkan fx:id dari Scene Builder ke Java
    @FXML
    private TableView<Kamar> tabelKamar;
    
    @FXML
    private javafx.scene.control.TextField inputNama;
    
    @FXML
    private javafx.scene.control.TextField inputTipe;
    
    @FXML
    private javafx.scene.control.TextField inputHarga;
    
    @FXML
    private javafx.scene.control.TextField inputStatus;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // Method ini akan otomatis berjalan saat layarnya baru pertama kali dibuka
        siapkanKolomTabel();
        ambilDataDariAPI();
    }

    private void siapkanKolomTabel() {
        // 2. Membuat kolom-kolom tabel
        TableColumn<Kamar, Integer> colId = new TableColumn<>("ID Kamar");
        colId.setCellValueFactory(new PropertyValueFactory<>("id")); // "id" harus persis dengan nama variabel di Kamar.java

        TableColumn<Kamar, String> colNama = new TableColumn<>("Nama Kos");
        colNama.setCellValueFactory(new PropertyValueFactory<>("namaKos"));

        TableColumn<Kamar, String> colTipe = new TableColumn<>("Tipe");
        colTipe.setCellValueFactory(new PropertyValueFactory<>("tipe"));

        TableColumn<Kamar, Integer> colHarga = new TableColumn<>("Harga (Rp)");
        colHarga.setCellValueFactory(new PropertyValueFactory<>("harga"));

        TableColumn<Kamar, String> colStatus = new TableColumn<>("Status");
        colStatus.setCellValueFactory(new PropertyValueFactory<>("status"));

        // Hapus kolom C1 & C2 bawaan Scene Builder, lalu masukkan kolom buatan kita
        tabelKamar.getColumns().clear();
        tabelKamar.getColumns().addAll(colId, colNama, colTipe, colHarga, colStatus);
        // Masukkan kode ini setelah tabelKamar.getColumns().addAll(...)
        tabelKamar.setColumnResizePolicy(TableView.CONSTRAINED_RESIZE_POLICY_ALL_COLUMNS);
    }

    private void ambilDataDariAPI() {
        // 3. Menembak API Spring Boot
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8080/api/kamar")) // PASTIKAN URL INI BENAR
                .build();

        // 4. Melakukan request di background (biar aplikasinya gak nge-freeze/not responding)
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenAccept(jsonString -> {
                    // 5. Gson menerjemahkan JSON menjadi List Java
                    Gson gson = new Gson();
                    List<Kamar> listKamar = gson.fromJson(jsonString, new TypeToken<List<Kamar>>(){}.getType());

                    // 6. Memasukkan data ke tabel (Harus memakai Platform.runLater untuk update UI)
                    Platform.runLater(() -> {
                        ObservableList<Kamar> dataKamar = FXCollections.observableArrayList(listKamar);
                        tabelKamar.setItems(dataKamar);
                    });
                })
                .exceptionally(e -> {
                    System.out.println("Gagal menarik data! Pastikan Spring Boot menyala.");
                    e.printStackTrace();
                    return null;
                });
    }

    // --- TAMBAHKAN FUNGSI INI DI PALING BAWAH ---
    @FXML
    private void simpanKamar() {
        try {
            // 1. Ambil ketikan user dan bungkus jadi Objek Kamar. 
            // (ID kita isi 0 karena biasanya ID dibuat otomatis oleh database/Spring Boot)
            int hargaKamar = Integer.parseInt(inputHarga.getText());
            Kamar kamarBaru = new Kamar(0, inputNama.getText(), inputTipe.getText(), hargaKamar, inputStatus.getText());

            // 2. Terjemahkan Objek Java tadi menjadi format teks JSON
            Gson gson = new Gson();
            String jsonRequest = gson.toJson(kamarBaru);

            // 3. Siapkan "Roket" POST untuk menembak API
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:8080/api/kamar")) // Pastikan endpoint-nya sesuai untuk tambah data (POST)
                    .header("Content-Type", "application/json") // Wajib ada agar Spring Boot tau kita ngirim JSON
                    .POST(HttpRequest.BodyPublishers.ofString(jsonRequest))
                    .build();

            // 4. Tembakkan ke Spring Boot!
            client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenAccept(response -> {
                        // Kalau responsnya 200 (OK) atau 201 (Created), berarti sukses!
                        if (response.statusCode() == 200 || response.statusCode() == 201) {
                            System.out.println("Data sukses masuk ke Database!");
                            
                            // Perintah UI harus dijalankan di dalam Platform.runLater
                            Platform.runLater(() -> {
                                // Bersihkan kotak isian
                                inputNama.clear();
                                inputTipe.clear();
                                inputHarga.clear();
                                inputStatus.clear();
                                
                                // Panggil ulang fungsi ambil data biar tabelnya otomatis ter-refresh!
                                ambilDataDariAPI();
                            });
                        } else {
                            System.out.println("Gagal menyimpan. Kode Status: " + response.statusCode());
                        }
                    })
                    .exceptionally(e -> {
                        System.out.println("Gagal koneksi ke Spring Boot!");
                        e.printStackTrace();
                        return null;
                    });

        } catch (NumberFormatException e) {
            // Ini untuk mencegah aplikasi error kalau user iseng ngisi huruf di kotak Harga
            System.out.println("GAGAL: Pastikan kotak Harga hanya diisi dengan angka bulat!");
        }
    }
}