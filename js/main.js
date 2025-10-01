const ghosts = [
    {
        "name": "Spirit",
        "evidence": ["EMF Level 5", "Ghost Writing", "Spirit Box"]
    },
    {
        "name": "Wraith",
        "evidence": ["EMF Level 5", "D.O.T.S.", "Spirit Box"]
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
        "name": "Banshee",
        "evidence": ["Ultraviolet", "D.O.T.S.", "Ghost Orbs"]
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
        "name": "Revenant",
        "evidence": ["Freezing", "Ghost Writing", "Ghost Orbs"]
    },
    {
        "name": "Shade",
        "evidence": ["EMF Level 5", "Ghost Writing", "Freezing"]
    },
    {
        "name": "Demon",
        "evidence": ["Ultraviolet", "Ghost Writing", "Freezing"]
    },
    {
        "name": "Yurei",
        "evidence": ["Freezing", "D.O.T.S.", "Ghost Orbs"]
    },
    {
        "name": "Oni",
        "evidence": ["EMF Level 5", "Freezing", "D.O.T.S."]
    },
    {
        "name": "Yokai",
        "evidence": ["D.O.T.S.", "Ghost Orbs", "Spirit Box"]
    },
    {
        "name": "Hantu",
        "evidence": ["Ultraviolet", "Freezing", "Ghost Orbs"]
    },
    {
        "name": "Goryo",
        "evidence": ["EMF Level 5", "Ultraviolet", "D.O.T.S."]
    },
    {
        "name": "Myling",
        "evidence": ["EMF Level 5", "Ultraviolet", "Ghost Writing"]
    },
    {
        "name": "Onryo",
        "evidence": ["Freezing", "Ghost Orbs", "Spirit Box"]
    },
    {
        "name": "The Twins",
        "evidence": ["EMF Level 5", "Freezing", "Spirit Box"]
    },
    {
        "name": "Raiju",
        "evidence": ["EMF Level 5", "D.O.T.S.", "Ghost Orbs"]
    },
    {
        "name": "Obake",
        "evidence": ["EMF Level 5", "Ultraviolet", "Ghost Orbs"]
    },
    {
        "name": "The Mimic",
        "evidence": ["Ultraviolet", "Freezing", "Ghost Orbs", "Spirit Box"]
    },
    {
        "name": "Moroi",
        "evidence": ["Ghost Writing", "Freezing", "Spirit Box"]
    },
    {
        "name": "Deogen",
        "evidence": ["Ghost Writing", "D.O.T.S.", "Spirit Box"]
    },
    {
        "name": "Thaye",
        "evidence": ["Ghost Writing", "D.O.T.S.", "Ghost Orbs"]
    }
];
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
    const evidenceType = `<button class="chk-evidence" id="${evidence}" data-state="open"><img src="./assets/images/checkbox.svg"/>${evidence}</button>`;
    document.querySelector(".evidence-list").innerHTML += evidenceType;

    evidenceList.push({
        name: evidence,
        active: "open",
    });
});
ghosts.forEach((ghost) => {
    const ghostType = `<p class="lbl-ghost" id="${ghost.name}">${ghost.name}</p>`;
    document.querySelector(".ghost-list").innerHTML += ghostType;

    ghostList.push({
        name: ghost.name,
        evidence: ghost.evidence,
        acitve: "open",
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
                    "./phas-evidence-sheet/assets/images/checkbox.svg"
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
                    ghost.acitve = "open";
                    return false;
                }
                if (
                    (!ghost.evidence.includes(evidence.name) &&
                        evidence.active == "no") ||
                    evidence.active == "open"
                ) {
                    gSelector.classList.remove("ghost-no");
                    ghost.acitve = "open";
                    return false;
                }
                if (
                    !ghost.evidence.includes(evidence.name) &&
                    evidence.active == "yes"
                ) {
                    gSelector.classList.add("ghost-no");
                    ghost.acitve = "no";
                    return true;
                }
                if (
                    ghost.evidence.includes(evidence.name) &&
                    evidence.active == "no"
                ) {
                    gSelector.classList.add("ghost-no");
                    ghost.acitve = "no";
                    return true;
                }
            });
        });
    });
});
