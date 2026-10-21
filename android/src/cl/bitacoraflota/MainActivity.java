package cl.bitacoraflota;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class MainActivity extends Activity {
    private static final int ELEGIR_ARCHIVO = 1;
    private WebView web;
    private ValueCallback<Uri[]> archivoCallback;

    @Override
    protected void onCreate(Bundle estado) {
        super.onCreate(estado);
        getWindow().setStatusBarColor(Color.parseColor("#16202B"));
        getWindow().setNavigationBarColor(Color.parseColor("#16202B"));

        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        web.addJavascriptInterface(new Puente(), "AndroidApp");

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                Uri u = req.getUrl();
                if ("file".equals(u.getScheme())) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception ignored) { }
                return true;
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (archivoCallback != null) archivoCallback.onReceiveValue(null);
                archivoCallback = callback;
                try {
                    startActivityForResult(params.createIntent(), ELEGIR_ARCHIVO);
                } catch (Exception e) {
                    archivoCallback = null;
                    return false;
                }
                return true;
            }
        });

        setContentView(web);
        if (estado != null) web.restoreState(estado);
        else web.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    protected void onSaveInstanceState(Bundle estado) {
        super.onSaveInstanceState(estado);
        web.saveState(estado);
    }

    @Override
    protected void onActivityResult(int codigo, int resultado, Intent datos) {
        if (codigo == ELEGIR_ARCHIVO && archivoCallback != null) {
            archivoCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultado, datos));
            archivoCallback = null;
            return;
        }
        super.onActivityResult(codigo, resultado, datos);
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(window.appAtras && window.appAtras()) ? '1' : '0'", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String v) {
                if (!"\"1\"".equals(v)) finish();
            }
        });
    }

    private class Puente {
        @JavascriptInterface
        public String guardarArchivo(String nombre, String base64) {
            try {
                byte[] bytes = Base64.decode(base64, Base64.DEFAULT);
                String mime = nombre.endsWith(".xlsx") ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        : nombre.endsWith(".json") ? "application/json" : "application/octet-stream";
                if (Build.VERSION.SDK_INT >= 29) {
                    ContentValues v = new ContentValues();
                    v.put(MediaStore.MediaColumns.DISPLAY_NAME, nombre);
                    v.put(MediaStore.MediaColumns.MIME_TYPE, mime);
                    v.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/Bitacora Flota");
                    Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
                    OutputStream out = getContentResolver().openOutputStream(uri);
                    out.write(bytes);
                    out.close();
                    return "Guardado en Descargas/Bitacora Flota/" + nombre;
                }
                File dir = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
                File f = new File(dir, nombre);
                FileOutputStream out = new FileOutputStream(f);
                out.write(bytes);
                out.close();
                return "Guardado en " + f.getAbsolutePath();
            } catch (Exception e) {
                return "No se pudo guardar el archivo: " + e.getMessage();
            }
        }
    }
}
