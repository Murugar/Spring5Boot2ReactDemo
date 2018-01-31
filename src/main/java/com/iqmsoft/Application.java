package com.iqmsoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.iqmsoft.infrastructue.Browser;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        if (Browser.isPortAvailable("localhost", 8080)) SpringApplication.run(Application.class, args);
        Browser.open("http://localhost:8080");
    }
}
