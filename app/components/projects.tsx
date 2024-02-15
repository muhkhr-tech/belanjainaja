export default function ProjectsSection() {
  return (
    <div className="mb-10">
      <h2 className="text-3xl text-slate-700 mb-5">Works</h2>
      <div className="mb-5">
        <p><strong>~ Freelance</strong></p>
        <p className="text-sm text-slate-600 mb-3"><i>Fullstack Developer | Desember 2019 – Juni 2020</i></p>
        <p>“Sistem Informasi Manajemen Akreditasi Kampus”</p>
        <p>
          Projek sistem informasi ini berbasis website yang berfungsi untuk mengelola data-data yang terkait dengan kebutuhan akreditasi suatu kampus.
        </p>
        <p>
          Data yang dikelola berupa variabel-variabel yang dibutuhkan untuk akreditasi seperti; data dosen, penelitian dan pengabdian dosen, alumni, waktu mendapat pekerjaan pertama dan tempat kerja pertama alumni dan beberapa data lainnya.
        </p>
        <p>
          Kemudian dibuatkan sistem simulasi untuk mengetahui level akreditasi yang mungkin diperoleh dari data-data tersebut.
        </p>
      </div>

      <div className="mb-5">
        <p><strong>~ PT Danova</strong></p>
        <p className="text-sm text-slate-600 mb-3"><i>Fullstack Developer | Maret 2022 – Sekarang</i></p>
        <ul>
          <li className="mb-5 ms-6">
            <p>1. “Home Care Solutions”</p>
            <p>
              Home Care Solutions merupakan produk yang berbasis mobile app yang kami kembangkan sebagai solusi dari maslalah tingginya angka kematian ibu dan anak yang ada di Kabupaten Lombok Tengah Provinsi Nusa Tenggara Barat.
            </p>
            <p>
              Saya sebagai developer yang mengerjakan bagian backend untuk menyediakan API yang dibutuhkan oleh mobile app.
            </p>
            <p>
              Selain itu saya juga membuat halaman dashboard admin yang digunakan oleh admin untuk mengelola data-data tersebut.
            </p>
          </li>

          <li className="ms-6">
            <p>2. “Wahfazh Chat Messaging”</p>
            <p>
              Wahfazh merupakan projek yang berbasis mobile app yang kami kembangkan dan digunakan untuk berkomunikasi berupa personal chat maupun chat group.
            </p>
            <p>
              Kami menggunakan chat engine dari pihak ketiga sebagai sistem chat messangernya.
            </p>
            <p>
              Saya sebagai developer menyediakan API untuk otentikasi dari mobile app, dan juga halaman dashboard admin untuk mengelola user (melakukan verifikasi pembuatan akun dan menghapus akun) dan menampilkan daftar user yang sedang online maupun last seen user.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}