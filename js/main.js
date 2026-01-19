const ghosts = [
    {
        "name": "Banshee",
        "evidence": ["Ultraviolet", "D.O.T.S.", "Ghost Orbs"]
    },
    {
        "name": "Dayan",
        "evidence": ["EMF Level 5", "Ghost Orbs", "Spirit Box"]
    },
    {
        "name": "Deogen",
        "evidence": ["Ghost Writing", "D.O.T.S.", "Spirit Box"]
    },
    {
        "name": "Demon",
        "evidence": ["Ultraviolet", "Ghost Writing", "Freezing"]
    },
    {
        "name": "Gallu",
        "evidence": ["EMF Level 5", "Ultraviolet", "Spirit Box"]
    },
    {
        "name": "Goryo",
        "evidence": ["EMF Level 5", "Ultraviolet", "D.O.T.S."]
    },
    {
        "name": "Hantu",
        "evidence": ["Ultraviolet", "Freezing", "Ghost Orbs"]
    },
    {
        "name": "Jinn",
        "evidence": ["EMF Level 5", "Ultraviolet", "Freezing"]
    },
    {
        "name": "Mare",
        "evidence": ["Ghost Writing", "Ghost Orbs", "Spirit Box"]
    },
    {
        "name": "Moroi",
        "evidence": ["Ghost Writing", "Freezing", "Spirit Box"]
    },
    {
        "name": "Myling",
        "evidence": ["EMF Level 5", "Ultraviolet", "Ghost Writing"]
    },
    {
        "name": "Obake",
        "evidence": ["EMF Level 5", "Ultraviolet", "Ghost Orbs"]
    },
    {
        "name": "Obambo",
        "evidence": ["Ghost Writing", "Ultraviolet", "D.O.T.S."]
    },
    {
        "name": "Oni",
        "evidence": ["EMF Level 5", "Freezing", "D.O.T.S."]
    },
    {
        "name": "Onryo",
        "evidence": ["Freezing", "Ghost Orbs", "Spirit Box"]
    },
    {
        "name": "Phantom",
        "evidence": ["Ultraviolet", "D.O.T.S.", "Spirit Box"]
    },
    {
        "name": "Poltergeist",
        "evidence": ["Ultraviolet", "Ghost Writing", "Spirit Box"]
    },
    {
        "name": "Raiju",
        "evidence": ["EMF Level 5", "D.O.T.S.", "Ghost Orbs"]
    },
    {
        "name": "Revenant",
        "evidence": ["Freezing", "Ghost Writing", "Ghost Orbs"]
    },
    {
        "name": "Shade",
        "evidence": ["EMF Level 5", "Ghost Writing", "Freezing"]
    },
    {
        "name": "Spirit",
        "evidence": ["EMF Level 5", "Ghost Writing", "Spirit Box"]
    },
    {
        "name": "Thaye",
        "evidence": ["Ghost Writing", "D.O.T.S.", "Ghost Orbs"]
    },
    {
        "name": "The Mimic",
        "evidence": ["Ultraviolet", "Freezing", "Ghost Orbs", "Spirit Box"]
    },
    {
        "name": "The Twins",
        "evidence": ["EMF Level 5", "Freezing", "Spirit Box"]
    },
    {
        "name": "Wraith",
        "evidence": ["EMF Level 5", "D.O.T.S.", "Spirit Box"]
    },
    {
        "name": "Yokai",
        "evidence": ["D.O.T.S.", "Ghost Orbs", "Spirit Box"]
    },
    {
        "name": "Yurei",
        "evidence": ["Freezing", "D.O.T.S.", "Ghost Orbs"]
    }
]
;
const evidences = [
    "EMF Level 5",
    "Ultraviolet",
    "Ghost Writing",
    "Freezing",
    "D.O.T.S.",
    "Ghost Orbs",
    "Spirit Box",
];

let ghostList = [];
let evidenceList = [];

evidences.forEach((evidence) => {
    const evidenceType = `<button class="chk-evidence evidence-${evidence
        .replaceAll(" ", "-")
        .replaceAll(".", "")
        .toLowerCase()}" id="${evidence}" data-state="open"><img src="./assets/images/checkbox.svg"/><p>${evidence}</p></button>`;
    document.querySelector(".evidence-list").innerHTML += evidenceType;

    evidenceList.push({
        name: evidence,
        active: "open",
    });
});
ghosts.forEach((ghost) => {
    const ghostType = `<div class="lbl-ghost" id="${ghost.name}">
    <h2>${ghost.name}</h2>
    <div class="ghost-evidence">
       <p class="evidence-${ghost.evidence[0]
           .replaceAll(" ", "-")
           .replaceAll(".", "")
           .toLowerCase()}">${ghost.evidence[0]}</p>
       <p class="evidence-${ghost.evidence[1]
           .replaceAll(" ", "-")
           .replaceAll(".", "")
           .toLowerCase()}">${ghost.evidence[1]}</p>
       <p class="evidence-${ghost.evidence[2]
           .replaceAll(" ", "-")
           .replaceAll(".", "")
           .toLowerCase()}">${ghost.evidence[2]}</p>
    </div>
    </div>`;
    document.querySelector(".ghost-list").innerHTML += ghostType;

    ghostList.push({
        name: ghost.name,
        evidence: ghost.evidence,
        active: "open",
    });
});

document.querySelectorAll(".chk-evidence").forEach((eSelector) => {
    eSelector.addEventListener("click", (event) => {
        switch (eSelector.dataset.state) {
            case "open":
                eSelector.children[0].setAttribute(
                    "src",
                    "./assets/images/checkboxYes.svg"
                );
                eSelector.dataset.state = "yes";
                break;
            case "yes":
                eSelector.children[0].setAttribute(
                    "src",
                    "./assets/images/checkboxNo.svg"
                );
                eSelector.dataset.state = "no";
                break;
            case "no":
            default:
                eSelector.children[0].setAttribute(
                    "src",
                    "./assets/images/checkbox.svg"
                );
                eSelector.dataset.state = "open";
                break;
        }

        evidenceList[
            evidenceList.findIndex((e) => e.name == eSelector.id)
        ].active = eSelector.dataset.state;

        document.querySelectorAll(".lbl-ghost").forEach((gSelector) => {
            const ghost =
                ghostList[ghostList.findIndex((g) => g.name == gSelector.id)];

            evidenceList.some((evidence) => {
                if (
                    (ghost.evidence.includes(evidence.name) &&
                        evidence.active == "yes") ||
                    evidence.active == "open"
                ) {
                    gSelector.classList.remove("ghost-no");
                    ghost.active = "open";
                    return false;
                }
                if (
                    (!ghost.evidence.includes(evidence.name) &&
                        evidence.active == "no") ||
                    evidence.active == "open"
                ) {
                    gSelector.classList.remove("ghost-no");
                    ghost.active = "open";
                    return false;
                }
                if (
                    !ghost.evidence.includes(evidence.name) &&
                    evidence.active == "yes"
                ) {
                    gSelector.classList.add("ghost-no");
                    ghost.active = "no";
                    return true;
                }
                if (
                    ghost.evidence.includes(evidence.name) &&
                    evidence.active == "no"
                ) {
                    gSelector.classList.add("ghost-no");
                    ghost.active = "no";
                    return true;
                }
            });
        });

        let openEvidence = [];
        ghostList.forEach((ghost) => {
            if (ghost.active == "open") {
                ghost.evidence.forEach((e) => {
                    if (!openEvidence.includes(e)) openEvidence.push(e);
                });
            }
        });
        document.querySelectorAll(".chk-evidence").forEach((evSelector) => {
            const checkbox = evSelector.children[0].attributes[0].value;

            if (
                !openEvidence.includes(evSelector.id) &&
                evSelector.dataset.state != "no"
            ) {
                evSelector.setAttribute("disabled", "");
                evSelector.children[0].setAttribute(
                    "src",
                    "./assets/images/checkboxLock.svg"
                );
            } else {
                evSelector.removeAttribute("disabled");
                if (checkbox == "./assets/images/checkboxLock.svg") {
                    evSelector.children[0].setAttribute(
                        "src",
                        "./assets/images/checkbox.svg"
                    );
                } else {
                    evSelector.children[0].setAttribute("src", checkbox);
                }
            }
        });
    });
});

document.getElementById("reset").addEventListener("click", () => {
    evidenceList.forEach((evidence, index) => {
        evidenceList[index].active = "open";
        document
            .getElementById(evidence.name)
            .children[0].setAttribute("src", "./assets/images/checkbox.svg");
        document.getElementById(evidence.name).dataset.state = "open";
        document.getElementById(evidence.name).removeAttribute("disabled");
    });
    ghostList.forEach((ghost, index) => {
        ghostList[index].active = "open";
        document.getElementById(ghost.name).classList.remove("ghost-no");
    });
});
