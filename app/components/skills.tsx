export default function SkillsSection() {
  return (
    <div className="mb-10">
      <h2 className="text-3xl text-slate-700 mb-5">Keahlian</h2>
      <div className="mb-5">
        <p><strong>~ Bahasa Pemrograman</strong></p>
        <p className="text-sm text-slate-600 mb-3"><i>Python, Javascript</i></p>

        <p><strong>~ Frontend</strong></p>
        <p className="text-sm text-slate-600 mb-3"><i>Next JS, Bootstrap 4 & 5, Tailwind CSS, HTML, CSS</i></p>

        <p><strong>~ Backend</strong></p>
        <p className="text-sm text-slate-600 mb-3"><i>Flask, FastApi, Django</i><br />
        <p>Note:</p>
          <ul className="ms-4">
            <li className="list-disc">Semua projek/product yang dikerjakan dibuat dengan menggunakan Flask</li>
            <li className="list-disc">Sudah pernah mencoba FastAPI & Django, tapi belum pernah digunakan selama pengalaman kerja.</li>
          </ul></p>

        <p><strong>~ Lainnya</strong></p>
        <p className="text-sm text-slate-600 mb-3"><i>Git</i></p>

      </div>
    </div>
  )
}