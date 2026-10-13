// Variabel global untuk menyimpan data
let namaUser = "";
let jumlahPilihan = 0;
let arrayPilihan = [];
let pilihanDipilih = "";
let emailUser = "";

// 1. Proses Nama dan Jumlah Pilihan
function prosesJumlahPilihan() {
    namaUser = document.getElementById("nama").value.trim();
    let jmlInput = document.getElementById("jumlahPilihan").value;
    jumlahPilihan = parseInt(jmlInput);

    // Error handling untuk input kosong atau angka <= 0
    if (namaUser === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }
    if (isNaN(jumlahPilihan) || jumlahPilihan <= 0) {
        alert("Jumlah pilihan harus berupa angka positif (spinner error handling)!");
        return;
    }

    // Generate input teks pilihan secara dinamis menggunakan loop
    let container = document.getElementById("container-pilihan");
    container.innerHTML = "";
    
    for (let i = 1; i <= jumlahPilihan; i++) {
        container.innerHTML += `
            <div class="input-group">
                <label>Pilihan ${i} :</label>
                <input type="text" id="pilihan-${i}" placeholder="Masukkan Teks Pilihan ${i}">
            </div>
        `;
    }

    // Pindah tampilan step
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("step-2").classList.remove("hidden");
}

// 2. Proses Teks Pilihan
function prosesTeksPilihan() {
    arrayPilihan = [];
    for (let i = 1; i <= jumlahPilihan; i++) {
        let val = document.getElementById(`pilihan-${i}`).value.trim();
        if (val === "") {
            alert(`Teks Pilihan ${i} tidak boleh kosong!`);
            return;
        }
        arrayPilihan.push(val);
    }

    // Buat radio button menggunakan loop dari array
    let containerRadio = document.getElementById("container-radio");
    containerRadio.innerHTML = "";
    
    arrayPilihan.forEach((teks, index) => {
        containerRadio.innerHTML += `
            <div>
                <input type="radio" id="radio-${index}" name="opsiPilihan" value="${teks}">
                <label for="radio-${index}" style="display:inline;">${teks}</label>
            </div>
        `;
    });

    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("step-3").classList.remove("hidden");
}

// 3. Proses Pilihan Radio Button
function prosesPilihanRadio() {
    let radios = document.getElementsByName("opsiPilihan");
    let terpilih = false;

    for (let r of radios) {
        if (r.checked) {
            pilihanDipilih = r.value;
            terpilih = true;
            break;
        }
    }

    if (!terpilih) {
        alert("Silakan pilih salah satu opsi terlebih dahulu!");
        return;
    }

    document.getElementById("step-3").classList.add("hidden");
    document.getElementById("step-4").classList.remove("hidden");
}

// 4. Proses Email dengan Error Check / Pattern Matching
function prosesEmail() {
    let emailInput = document.getElementById("email").value.trim();
    
    // Pattern matching sederhana untuk validasi email (@ dan domain)
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput)) {
        alert("Format email salah! Masukkan dengan format teks Email@domain.com dan masukan ulang.");
        document.getElementById("email").focus();
        return;
    }

    emailUser = emailInput;

    document.getElementById("step-4").classList.add("hidden");
    document.getElementById("step-5").classList.remove("hidden");

    tampilkanHasilAkhir();
}

// 5. Tampilkan Output Akhir Menggunakan JavaScript DOM
function tampilkanHasilAkhir() {
    let outputDiv = document.getElementById("output-akhir");
    let gabunganPilihan = arrayPilihan.join(", ");

    outputDiv.innerHTML = `
        <p>Hallo, nama saya <strong>${namaUser}</strong>, email <strong>${emailUser}</strong> saya mempunyai sejumlah <strong>${jumlahPilihan}</strong> pilihan yaitu <strong>${gabunganPilihan}</strong>, dan saya memilih <strong>${pilihanDipilih}</strong></p>
    `;
}