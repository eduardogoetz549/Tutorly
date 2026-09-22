/* ===================================
   TESTDATEN
=================================== */

const teachers = [
    {
        id: 1,
        name: "Eduardo Goetz",
        initials: "EG",

        title: "Nachhilfe für Primar- und Oberstufe",

        subjects: [
            "Deutsch",
            "Italienisch",
            "Mathematik"
        ],

        levels: [
            "Primarstufe",
            "Oberstufe"
        ],

        lessonTypes: [
            "Online",
            "Vor Ort"
        ],

        price: 45,

        rating: 4.9,

        reviews: 18,

        experience:
            "Studium Sekundarstufe I und Erfahrung im schulischen Umfeld.",

        description:
            "Mir ist wichtig, dass Schülerinnen und Schüler Inhalte wirklich verstehen und nicht nur auswendig lernen. Gemeinsam arbeiten wir strukturiert an Unsicherheiten, Hausaufgaben und Prüfungsvorbereitungen."
    },

    {
        id: 2,
        name: "Laura Meier",
        initials: "LM",

        title: "Mathematik & Naturwissenschaften",

        subjects: [
            "Mathematik"
        ],

        levels: [
            "Primarstufe",
            "Oberstufe"
        ],

        lessonTypes: [
            "Online"
        ],

        price: 50,

        rating: 4.8,

        reviews: 24,

        experience:
            "Mehrjährige Erfahrung in privater Nachhilfe.",

        description:
            "Ich erkläre Mathematik Schritt für Schritt und passe die Übungen individuell an den Lernstand an."
    },

    {
        id: 3,
        name: "Marco Rossi",
        initials: "MR",

        title: "Italienisch & Sprachen",

        subjects: [
            "Italienisch",
            "Deutsch"
        ],

        levels: [
            "Oberstufe"
        ],

        lessonTypes: [
            "Online",
            "Vor Ort"
        ],

        price: 48,

        rating: 4.7,

        reviews: 13,

        experience:
            "Sprachunterricht für Jugendliche und Erwachsene.",

        description:
            "Italienisch lernen soll praktisch sein. Wir arbeiten mit Gesprächen, Grammatik und realistischen Alltagssituationen."
    },

    {
        id: 4,
        name: "Sophie Keller",
        initials: "SK",

        title: "Englisch & Französisch",

        subjects: [
            "Englisch",
            "Französisch"
        ],

        levels: [
            "Primarstufe",
            "Oberstufe"
        ],

        lessonTypes: [
            "Online"
        ],

        price: 42,

        rating: 4.9,

        reviews: 31,

        experience:
            "Sprachunterricht und Prüfungsvorbereitung.",

        description:
            "Gemeinsam verbessern wir Wortschatz, Grammatik und Sicherheit beim Sprechen."
    }
];


/* ===================================
   ELEMENTE
=================================== */

const pages =
    document.querySelectorAll(".page");

const navigationButtons =
    document.querySelectorAll("[data-page]");

const teacherList =
    document.getElementById("teacherList");

const allTeachers =
    document.getElementById("allTeachers");

const resultCount =
    document.getElementById("resultCount");

const subjectFilter =
    document.getElementById("subjectFilter");

const levelFilter =
    document.getElementById("levelFilter");

const lessonFilter =
    document.getElementById("lessonFilter");

const sortFilter =
    document.getElementById("sortFilter");

const profileContent =
    document.getElementById("profileContent");

const bookingModal =
    document.getElementById("bookingModal");

const loginModal =
    document.getElementById("loginModal");

const teacherModal =
    document.getElementById("teacherModal");

const mobileMenu =
    document.getElementById("mobileMenu");

const toast =
    document.getElementById("toast");


/* ===================================
   SEITENWECHSEL
=================================== */

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    mobileMenu.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageId === "search") {
        filterTeachers();
    }

    if (pageId === "teachers") {
        renderTeachers(
            teachers,
            allTeachers
        );
    }
}


navigationButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const page =
            button.dataset.page;

        showPage(page);
    });

});


/* ===================================
   LEHRERKARTEN
=================================== */

function createTeacherCard(teacher) {

    const subjects =
        teacher.subjects
            .map(
                subject =>
                    `<span class="tag">${subject}</span>`
            )
            .join("");

    return `
        <article class="teacher-card">

            <div class="teacher-avatar">
                ${teacher.initials}
            </div>

            <div class="teacher-info">

                <h3>${teacher.name}</h3>

                <div class="teacher-title">
                    ${teacher.title}
                </div>

                <div class="tags">
                    ${subjects}
                </div>

                <div class="teacher-meta">

                    <span class="teacher-rating">
                        ★ ${teacher.rating}
                        (${teacher.reviews})
                    </span>

                    <span>
                        ${teacher.lessonTypes.join(" · ")}
                    </span>

                    <span>
                        ${teacher.levels.join(" · ")}
                    </span>

                </div>

            </div>

            <div class="teacher-action">

                <div class="price">
                    CHF ${teacher.price}
                    <small>pro Lektion</small>
                </div>

                <button
                    class="btn btn-primary"
                    onclick="openProfile(${teacher.id})"
                >
                    Profil ansehen
                </button>

            </div>

        </article>
    `;
}


function renderTeachers(list, container) {

    if (!container) {
        return;
    }

    if (list.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>Keine Lehrpersonen gefunden</h3>

                <p>
                    Ändere deine Filter und versuche es erneut.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        list
            .map(createTeacherCard)
            .join("");
}


/* ===================================
   FILTER
=================================== */

function filterTeachers() {

    let filtered =
        [...teachers];

    const subject =
        subjectFilter.value;

    const level =
        levelFilter.value;

    const lesson =
        lessonFilter.value;

    const sort =
        sortFilter.value;


    if (subject) {

        filtered =
            filtered.filter(
                teacher =>
                    teacher.subjects.includes(subject)
            );
    }


    if (level) {

        filtered =
            filtered.filter(
                teacher =>
                    teacher.levels.includes(level)
            );
    }


    if (lesson) {

        filtered =
            filtered.filter(
                teacher =>
                    teacher.lessonTypes.includes(lesson)
            );
    }


    if (sort === "price-low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );
    }


    if (sort === "rating") {

        filtered.sort(
            (a, b) =>
                b.rating - a.rating
        );
    }


    resultCount.textContent =
        `${filtered.length} Lehrperson${
            filtered.length === 1
                ? ""
                : "en"
        } gefunden`;


    renderTeachers(
        filtered,
        teacherList
    );
}


[
    subjectFilter,
    levelFilter,
    lessonFilter,
    sortFilter
].forEach(filter => {

    filter.addEventListener(
        "change",
        filterTeachers
    );

});


/* ===================================
   SCHNELLSUCHE
=================================== */

document
    .getElementById("quickSearchButton")
    .addEventListener("click", () => {

        const subject =
            document.getElementById(
                "homeSubject"
            ).value;

        const level =
            document.getElementById(
                "homeLevel"
            ).value;


        subjectFilter.value =
            subject;

        levelFilter.value =
            level;


        showPage("search");
    });


/* ===================================
   FACHKARTEN
=================================== */

document
    .querySelectorAll(".subject-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const subject =
                    card.dataset.subject;

                subjectFilter.value =
                    subject;

                showPage("search");
            }
        );

    });


/* ===================================
   PROFIL
=================================== */

function openProfile(id) {

    const teacher =
        teachers.find(
            teacher =>
                teacher.id === id
        );

    if (!teacher) {
        return;
    }


    const subjectTags =
        teacher.subjects
            .map(
                subject =>
                    `<span class="tag">${subject}</span>`
            )
            .join("");


    profileContent.innerHTML = `
        <article class="profile-card">

            <div class="profile-header">

                <div class="profile-avatar">
                    ${teacher.initials}
                </div>

                <div>

                    <h1>
                        ${teacher.name}
                    </h1>

                    <p>
                        ${teacher.title}
                    </p>

                    <div class="tags">
                        ${subjectTags}
                    </div>

                    <div class="teacher-meta">

                        <span class="teacher-rating">
                            ★ ${teacher.rating}
                            (${teacher.reviews} Bewertungen)
                        </span>

                        <span>
                            ${teacher.lessonTypes.join(" · ")}
                        </span>

                    </div>

                </div>

                <button
                    class="btn btn-primary"
                    onclick="openBooking(${teacher.id})"
                >
                    Termin anfragen
                </button>

            </div>


            <div class="profile-body">

                <div>

                    <section class="profile-section">

                        <h3>Über mich</h3>

                        <p>
                            ${teacher.description}
                        </p>

                    </section>


                    <section class="profile-section">

                        <h3>Erfahrung</h3>

                        <p>
                            ${teacher.experience}
                        </p>

                    </section>


                    <section class="profile-section">

                        <h3>Schulstufen</h3>

                        <div class="tags">

                            ${teacher.levels
                                .map(
                                    level =>
                                        `<span class="tag">${level}</span>`
                                )
                                .join("")}

                        </div>

                    </section>


                    <section class="profile-section">

                        <h3>Unterricht</h3>

                        <p>
                            ${teacher.lessonTypes.join(" und ")}
                        </p>

                    </section>

                </div>


                <aside class="booking-box">

                    <span class="small-label">
                        NACHHILFE
                    </span>

                    <div class="price">
                        CHF ${teacher.price}
                        <small>pro Lektion</small>
                    </div>

                    <p>
                        Sende eine unverbindliche
                        Terminanfrage an
                        ${teacher.name}.
                    </p>

                    <br>

                    <button
                        class="btn btn-primary btn-full"
                        onclick="openBooking(${teacher.id})"
                    >
                        Termin anfragen
                    </button>

                </aside>

            </div>

        </article>
    `;


    showPage("profile");
}


/* ===================================
   BUCHUNG
=================================== */

function openBooking(id) {

    const teacher =
        teachers.find(
            teacher =>
                teacher.id === id
        );

    if (!teacher) {
        return;
    }


    document.getElementById(
        "bookingTeacherName"
    ).textContent =
        `Termin bei ${teacher.name} anfragen`;


    document.getElementById(
        "bookingTeacher"
    ).value =
        teacher.id;


    const bookingSubject =
        document.getElementById(
            "bookingSubject"
        );


    const firstSubject =
        teacher.subjects[0];


    bookingSubject.value =
        firstSubject;


    bookingModal.classList.add("open");
}


document
    .getElementById("closeBooking")
    .addEventListener("click", () => {

        bookingModal.classList.remove(
            "open"
        );

    });


document
    .getElementById("bookingForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const teacherId =
                Number(
                    document.getElementById(
                        "bookingTeacher"
                    ).value
                );


            const teacher =
                teachers.find(
                    teacher =>
                        teacher.id === teacherId
                );


            bookingModal.classList.remove(
                "open"
            );


            event.target.reset();


            showToast(
                `Deine Anfrage an ${teacher.name} wurde gespeichert.`
            );
        }
    );


/* ===================================
   LOGIN
=================================== */

document
    .getElementById("loginButton")
    .addEventListener("click", () => {

        loginModal.classList.add("open");

    });


document
    .getElementById("closeLogin")
    .addEventListener("click", () => {

        loginModal.classList.remove(
            "open"
        );

    });


document
    .getElementById("demoLoginButton")
    .addEventListener("click", () => {

        loginModal.classList.remove(
            "open"
        );

        showToast(
            "Der echte Login folgt mit der Datenbank."
        );

    });


/* ===================================
   LEHRPERSON REGISTRIEREN
=================================== */

function openTeacherModal() {

    teacherModal.classList.add("open");

}


document
    .getElementById("teacherSignupButton")
    .addEventListener(
        "click",
        openTeacherModal
    );


document
    .getElementById("heroTeacherButton")
    .addEventListener(
        "click",
        openTeacherModal
    );


document
    .getElementById("closeTeacherModal")
    .addEventListener("click", () => {

        teacherModal.classList.remove(
            "open"
        );

    });


document
    .getElementById("teacherForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            teacherModal.classList.remove(
                "open"
            );

            event.target.reset();

            showToast(
                "Danke! Dein Interesse wurde gespeichert."
            );

        }
    );


/* ===================================
   MOBILE MENU
=================================== */

document
    .getElementById("menuButton")
    .addEventListener("click", () => {

        mobileMenu.classList.toggle(
            "open"
        );

    });


/* ===================================
   MODALS SCHLIESSEN
=================================== */

[
    bookingModal,
    loginModal,
    teacherModal
].forEach(modal => {

    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {

                modal.classList.remove(
                    "open"
                );
            }

        }
    );

});


/* ===================================
   TOAST
=================================== */

let toastTimer;

function showToast(message) {

    clearTimeout(toastTimer);

    toast.textContent =
        message;

    toast.classList.add("show");


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3500);
}


/* ===================================
   DATUM
=================================== */

const dateInput =
    document.getElementById(
        "bookingDate"
    );


const today =
    new Date()
        .toISOString()
        .split("T")[0];


dateInput.min =
    today;


/* ===================================
   START
=================================== */

renderTeachers(
    teachers,
    teacherList
);

renderTeachers(
    teachers,
    allTeachers
);