export async function getGhosts() {
    return fetch("/assets/ghosts.json").then((res) => {
        return res.json();
    });
}

export const evidences = [
    "EMF Level 5",
    "Ultraviolet",
    "Ghost Writing",
    "Freezing",
    "D.O.T.S.",
    "Ghost Orbs",
    "Spirit Box",
];
