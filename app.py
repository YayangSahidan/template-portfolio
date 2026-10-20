from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from flask import Flask, render_template

app = Flask(__name__)
# Memudahkan penyuntingan lokal. Restart server setelah mengubah data Python.
app.config.update(TEMPLATES_AUTO_RELOAD=True, SEND_FILE_MAX_AGE_DEFAULT=0)

# Satu sumber konten. Nilai skill/statistik berasal dari ZIP yang diberikan.
# Sesuaikan berdasarkan keadaan sebenarnya; None berarti belum diisi.
PORTFOLIO_DATA = {'profile': {'full_name': 'YAYANG SAHIDAN',
             'nickname': 'Sahid',
             'role_right': '<Coder>',
             'tagline_left': 'You don not have to be perfect but you should live as a good person',
             'tagline_right': ' I write Python that thinks, and websites that feel effortless.',
             'bio': (
                    "I am Sahid, a web developer based in Bali. "
                    "I help business owners and creatives build professional, "
                    "responsive websites that are easy to manage. "
                    "I develop user interfaces and integrate content management systems "
                    "so you can update your content independently. "
                    "Every project starts with understanding your business needs, "
                    "then turning them into features and interfaces that fit. "
                    "Let's discuss your website goals and how I can help you achieve them."
                ),
             'location': 'Bali, Indonesia',
             'email': 'yayangsahidan08@gmail.com',
             'github': 'https://github.com/YayangSahidan',
             'linkedin': 'https://linkedin.com/in/username',
             'instagram': 'https://instagram.com/username',
             'greeting': "It's me",
             'campus': 'ITB STIKOM Bali',
             'cohort': '2024',
             'role': 'Mahasiswa Sistem Informasi · Developer',
             'photo_alt': 'Foto potret Yayang Sahidan dengan ilustrasi budaya pada separuh '
                          'wajah',
             'culture_note': 'Inspirasi visual Bali melalui poleng; angklung menghadirkan '
                             'budaya Sunda.',
             'code_lines': ['<main id="sahid">',
                            '  <h1>Halo, dunia.</h1>',
                            '</main>',
                            '@app.get("/")',
                            'def index():',
                            '    return render_template("index.html")']},
 'projects': [
    {
        'id': 'proj-1',
        "image": "images/project_1.png",
        'title': 'USWA JMD ADI GALLERY',
        'category': 'Website Galeri Seni / CMS',
        'description': (
            'Website galeri seni untuk menampilkan karya yang dijual. '
            'Dibangun menggunakan Next.js dan Sanity CMS agar klien '
            'dapat menambah, melihat, memperbarui, dan menghapus '
            'konten karya seni secara mandiri.'
        ),
        'tech': ['Next.js', 'Sanity CMS'],
        'link': 'Full-stack Developer',
        
    },
    {
        'id': 'proj-2',
        "image": "images/project_2.png",
        'title': 'Yoga Healthy Canggu',
        'category': 'Website / Dalam Pengembangan',
        'description': (
            'Proyek website untuk layanan yoga yang masih dalam tahap pengembangan.'
        ),
        'tech': [],
        'link': 'Full-stack Developer',
       
    },
    {
        'id': 'proj-3',
        "image": "images/project_3.png",
        'title': 'MESA Bali',
        'category': 'Website / Dalam Pengembangan',
        'description': (
            'Proyek pengembangan website MESA Bali. '
            'Membangun ulang website Mesa untuk melengkapi kebutuhan matakuliah Kerja Praktek.'
        ),
        'tech': ['Next.js', 'PHP'],
        'link': 'Full-stack Developer',
        
    },
],
 'navigation': [{'id': 'about', 'label': 'about'},
                {'id': 'portfolio', 'label': 'portfolio'},
                {'id': 'contact', 'label': 'contact'}]}


@app.template_filter("web_url")
def web_url(value):
    """Tautan web lengkap; akun contoh tidak dibuat menjadi tautan aktif."""
    if not isinstance(value, str) or any(char.isspace() for char in value):
        return None
    try:
        parsed = urlsplit(value)
        host = parsed.hostname
    except ValueError:
        return None
    if parsed.scheme not in {"https", "http"} or not host:
        return None
    if "username" in parsed.path.split("/"):
        return None
    return value


@app.template_filter("project_url")
def project_url(value):
    # Fragmen yang tersedia di template. Nilai "#" saja bukan tautan proyek.
    if value in {"#cover", "#about", "#skills", "#portfolio", "#contact", "#infografis"}:
        return value
    return web_url(value)


@app.template_filter("skill_level")
def skill_level(value):
    # Gunakan 80, bukan "80%"; tanda persen ditambahkan oleh template.
    return value if type(value) is int and 0 <= value <= 100 else None


@app.get("/")
def index():
    images = Path(app.static_folder) / "images"
    assets = {
        "photo_exists": (images / "foto.jpg").is_file(),
        "logo_exists": (images / "logoyayang_sahidan.png").is_file(),
        "pattern_kind": "photo" if (images / "angklung.png").is_file() else "vector",
    }
    return render_template(
        "index.html", data=PORTFOLIO_DATA, assets=assets,
        year=datetime.now(timezone.utc).year,
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5003, debug=False)
