import sys
import zipfile

with zipfile.ZipFile(sys.argv[1]) as src, open(sys.argv[2], "wb") as fp:
    with zipfile.ZipFile(fp, "w") as dst:
        for info in src.infolist():
            datos = src.read(info.filename)
            nuevo = zipfile.ZipInfo(info.filename, date_time=(2020, 1, 1, 0, 0, 0))
            nuevo.compress_type = info.compress_type
            nuevo.external_attr = info.external_attr
            if info.compress_type == zipfile.ZIP_STORED:
                inicio = fp.tell() + 30 + len(info.filename.encode())
                relleno = (-inicio) % 4
                nuevo.extra = b"\0" * relleno
            dst.writestr(nuevo, datos)
