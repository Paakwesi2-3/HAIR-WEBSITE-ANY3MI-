package com.hair;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;

public class Server {
    public static void main(String[] args) throws Exception {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", new StaticHandler());
        server.setExecutor(null);
        System.out.println("Server running at http://localhost:" + port);
        server.start();
    }

    static class StaticHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if (path.equals("/")) path = "/public/index.html";
            Path filePath = Path.of("." + path).normalize();
            if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
                byte[] notFound = "404 Not Found".getBytes();
                exchange.sendResponseHeaders(404, notFound.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(notFound);
                }
                return;
            }
            String mime = URLConnection.guessContentTypeFromName(filePath.toString());
            if (mime == null) mime = "application/octet-stream";
            byte[] data = Files.readAllBytes(filePath);
            exchange.getResponseHeaders().set("Content-Type", mime + "; charset=utf-8");
            exchange.sendResponseHeaders(200, data.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(data);
            }
        }
    }
}
