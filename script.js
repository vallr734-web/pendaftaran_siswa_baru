const DATA_VALID = {
    nama: "Muhammad Ihsan Supriadi",
    email: "mahmoodihsan@gmail.com",
    password: "asupelermirza" // 12 huruf
};

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = 'flex';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validasiForm(e) {
    e.preventDefault();

    const nama     = document.getElementById('nama').value.trim();
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const tanggal  = document.getElementById('tanggal').value;
    const gender   = document.getElementById('gender').value;
    const jurusan  = document.getElementById('jurusan').value;
    const alamat   = document.getElementById('alamat').value.trim();


    const errNama     = document.getElementById('err-nama');
    const errEmail    = document.getElementById('err-email');
    const errPassword = document.getElementById('err-password');
    const errTanggal  = document.getElementById('err-tanggal');
    const errGender   = document.getElementById('err-gender');
    const errJurusan  = document.getElementById('err-jurusan');
    const errAlamat   = document.getElementById('err-alamat');

    [errNama, errEmail, errPassword, errTanggal, errGender, errJurusan, errAlamat]
        .forEach(el => el.textContent = '');

    let valid = true;

    const namaRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
    if (nama === '') {
        errNama.textContent = 'Nama lengkap wajib diisi.';
        valid = false;
    } else if (!namaRegex.test(nama)) {
        errNama.textContent = 'Nama harus nama lengkap (minimal 2 kata), bukan username/panggilan, tanpa angka/simbol.';
        valid = false;
    } else if (nama.toLowerCase() !== DATA_VALID.nama.toLowerCase()) {
        errNama.textContent = 'Nama lengkap tidak cocok dengan data profil.';
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        errEmail.textContent = 'Email wajib diisi.';
        valid = false;
    } else if (!emailRegex.test(email)) {
        errEmail.textContent = 'Format email tidak valid.';
        valid = false;
    } else if (email.toLowerCase() !== DATA_VALID.email.toLowerCase()) {
        errEmail.textContent = 'Email tidak cocok dengan data profil.';
        valid = false;
    }

    if (password === '') {
        errPassword.textContent = 'Password wajib diisi.';
        valid = false;
    } else if (password.length < 12) {
        errPassword.textContent = `Password kurang dari 12 karakter (sekarang ${password.length}). Tidak bisa masuk.`;
        valid = false;
    } else if (password.length > 12) {
        errPassword.textContent = `Password lebih dari 12 karakter (sekarang ${password.length}). Password invalid.`;
        valid = false;
    } else if (password !== DATA_VALID.password) {
        errPassword.textContent = 'Password tidak cocok dengan data profil.';
        valid = false;
    }

    if (tanggal === '') {
        errTanggal.textContent = 'Tanggal lahir wajib diisi.';
        valid = false;
    } else {
        const tgl = new Date(tanggal);
        const now = new Date();
        if (tgl > now) {
            errTanggal.textContent = 'Tanggal lahir tidak boleh di masa depan.';
            valid = false;
        }
    }

    if (gender === '') {
        errGender.textContent = 'Jenis kelamin wajib dipilih.';
        valid = false;
    }

    if (jurusan === '') {
        errJurusan.textContent = 'Jurusan wajib dipilih.';
        valid = false;
    }

    if (alamat === '') {
        errAlamat.textContent = 'Alamat wajib diisi.';
        valid = false;
    } else if (alamat.length < 10) {
        errAlamat.textContent = 'Alamat terlalu singkat (minimal 10 karakter).';
        valid = false;
    }

    if (valid) {
        alert('✅ Pendaftaran berhasil! Data sesuai dengan profil.');
        document.getElementById('formPendaftaran').reset();
    } else {
        alert('❌ Data belum valid. Silakan periksa pesan error di form.');
    }

    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    showPage('beranda');

    const form = document.getElementById('formPendaftaran');
    if (form) {
        form.addEventListener('submit', validasiForm);
    }
});