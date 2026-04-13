module com.kos {
    requires javafx.controls;
    requires javafx.fxml;
    requires atlantafx.base;

    requires com.google.gson;
    requires java.net.http;

    opens com.kos to javafx.fxml, com.google.gson;
    exports com.kos;
}
