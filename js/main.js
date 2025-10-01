import { getGhosts, evidences } from "./utils.js";

const ghosts = await getGhosts();

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
