export default function WelcomeSection() {
  return (
    <div className="mb-10">
      <h2 className="text-3xl text-slate-700 mb-1">Hi, saya Rafiq
        <p className="text-sm text-slate-600"><i>Web Developer</i></p></h2>
      <div className="flex gap-4 mb-5">
        <a className="flex items-center text-sm ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg> <span className="ms-1">email</span></a>
        <a href="https://github.com/muhkhr-tech" target="_blank" className="flex items-center text-sm hover:text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-4 h-4">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg> <span className="ms-1">github</span></a>
        <a href="https://www.linkedin.com/in/khaerur-rafiq-a279aa257/" target="_blank" className="flex items-center text-sm hover:text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="0.89em" height="1em" viewBox="0 0 750 850" className="bg-blue-500 text-white"><path fill="currentColor" d="M165 90q0 35-21 59t-62 24q-37 0-59-24T0 95q0-35 23-61T83 8t60 24t22 58M0 750h165V214H0zm560-528q-32 0-57 8t-45 21t-33 27t-21 27h-4l-9-70H243q0 34 2 74t2 86v355h165V457q0-12 1-22t3-19q4-11 11-23t16-21t22-16t29-6q44 0 64 32t19 83v285h165V445q0-57-14-99t-38-70t-58-41t-72-13" /></svg> <span className="ms-1">linkedin</span></a>
        <a href="https://api.whatsapp.com/send?phone=6287798705864" target="_blank" className="flex items-center text-sm hover:text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg> <span className="ms-1">+6287798705864</span></a>
      </div>

      <p className="">Saya biasanya membuat website dengan menggunakan bahasa <i>Python</i> sebagai <i>Fullstack Developer</i>.</p>
      <p className="">Jika tidak sebagai <i>Fullstack Developer</i> dalam suatu project saya biasanya menangani bagian Backend.</p>
      <p className="">Namun saya juga tertarik dibagian <i>Frontend</i> menggunakan <i>Next JS</i></p>
    </div>
  )
}