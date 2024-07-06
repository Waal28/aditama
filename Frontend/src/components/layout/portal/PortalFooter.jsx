import constants from "../../../../constants";

export default function PortalFooter() {
  const { nama_pt, desk_pt, lokasi, kontak } = constants;
  return (
    <main className="w-full bg-header_footer text-gray-700 border-t-4 border-secondary">
      <div className="container p-10 mx-auto">
        <footer className="footer ">
          <nav className="w-fit">
            <h6 className="footer-title">{nama_pt}</h6>
            <div className="text-justify lg:w-96">{desk_pt}</div>
          </nav>
          <nav>
            <h6 className="footer-title">Lokasi</h6>
            <div className="flex items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M16 2A11.013 11.013 0 0 0 5 13a10.889 10.889 0 0 0 2.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.885 10.885 0 0 0 27 13A11.013 11.013 0 0 0 16 2m0 15a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4"
                  />
                  <circle cx="16" cy="13" r="4" fill="none" />
                </svg>
              </div>{" "}
              <div>{lokasi}</div>
            </div>
          </nav>
          <nav>
            <h6 className="footer-title">Kontak</h6>
            <div className="flex items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.312t.1-.413q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037"
                  />
                </svg>
              </div>
              <div>: {kontak.email}</div>
            </div>
            <div className="flex items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.825 20.975q-3.3 0-6.337-1.163q-3.038-1.162-5.375-3.225q-2.338-2.062-3.725-4.875Q2 8.9 2 5.6q0-1.1.612-1.85Q3.225 3 4.35 3h2.325q.675 0 1.05.387q.375.388.525 1.113q.15.75.338 1.55q.187.8.437 1.425q.225.525.138.987q-.088.463-.513.888l-1.95 1.9q1.2 1.75 3.338 3.387q2.137 1.638 4.162 2.238l1.15-2.325q.225-.45.575-.612q.35-.163.975-.113q.65.05 1.288.05q.637 0 1.437-.05q.75-.05 1.263.4q.512.45.687 1.45l.4 2.25l.05.425q0 1.05-.862 1.838q-.863.787-2.338.787Z"
                  />
                </svg>
              </div>
              <div>: {kontak.noHp}</div>
            </div>
          </nav>
        </footer>
      </div>
      <footer className="footer footer-center p-4 bg-gray-700 text-base-content">
        <aside>
          <p>© 2024 - {nama_pt}</p>
        </aside>
      </footer>
    </main>
  );
}
