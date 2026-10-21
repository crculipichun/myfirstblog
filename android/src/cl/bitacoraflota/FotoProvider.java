package cl.bitacoraflota;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import android.provider.OpenableColumns;

import java.io.File;
import java.io.FileNotFoundException;

public class FotoProvider extends ContentProvider {
    public static final String AUTORIDAD = "cl.bitacoraflota.fotos";

    static File carpeta(android.content.Context ctx) {
        File d = new File(ctx.getCacheDir(), "fotos");
        if (!d.exists()) d.mkdirs();
        return d;
    }

    private File archivo(Uri uri) throws FileNotFoundException {
        String nombre = uri.getLastPathSegment();
        if (nombre == null || !nombre.matches("[\\w.-]+")) throw new FileNotFoundException();
        return new File(carpeta(getContext()), nombre);
    }

    @Override public boolean onCreate() { return true; }

    @Override
    public ParcelFileDescriptor openFile(Uri uri, String modo) throws FileNotFoundException {
        return ParcelFileDescriptor.open(archivo(uri), ParcelFileDescriptor.parseMode(modo));
    }

    @Override
    public Cursor query(Uri uri, String[] columnas, String sel, String[] args, String orden) {
        MatrixCursor c = new MatrixCursor(new String[] { OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE });
        try { File f = archivo(uri); c.addRow(new Object[] { f.getName(), f.length() }); } catch (FileNotFoundException ignored) { }
        return c;
    }

    @Override public String getType(Uri uri) { return "image/jpeg"; }
    @Override public Uri insert(Uri uri, ContentValues v) { return null; }
    @Override public int delete(Uri uri, String s, String[] a) { return 0; }
    @Override public int update(Uri uri, ContentValues v, String s, String[] a) { return 0; }
}
