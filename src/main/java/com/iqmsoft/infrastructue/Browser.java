package com.iqmsoft.infrastructue;

import java.awt.*;
import java.io.IOException;
import java.net.Socket;
import java.net.URI;
import java.net.UnknownHostException;

public class Browser {
    public static void open(String url) {

        if (Desktop.isDesktopSupported()) {
            try {
                Desktop.getDesktop().browse(URI.create(url));
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            try {
                Runtime.getRuntime().exec("xdg-open " + url);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static boolean isPortAvailable(String host, int port) {
        try {
            (new Socket(host, port)).close();
            return false;
        } catch (IOException ignored) {
        }
        return true;
    }
}
