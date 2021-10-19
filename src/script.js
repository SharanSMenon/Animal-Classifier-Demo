import { loadModel, predict } from "./ml";
import translation from "./translation.json"
import "bootstrap/dist/css/bootstrap.min.css"

const file_upload = document.getElementById("file-uploader")

const classes = [
    "acinonyx-jubatus",
    "agalychnis-callidryas",
    "ankylosaurus-magniventris",
    "balaenoptera-musculus",
    "bos-taurus",
    "canis-lupus",
    "canis-lupus-familiaris",
    "carcharodon-carcharias",
    "ceratotherium-simum",
    "coelacanthiformes",
    "crocodylus-niloticus",
    "crotalus-atrox",
    "dendrobatidae",
    "diplodocus",
    "enteroctopus-dofleini",
    "equus-caballus",
    "equus-quagga",
    "eudocimus-albus",
    "falco-peregrinus",
    "felis-catus",
    "gallus-gallus-domesticus",
    "gavialis-gangeticus",
    "giraffa-camelopardalis",
    "gorilla-gorilla",
    "haliaeetus-leucocephalus",
    "hippopotamus-amphibius",
    "homo-sapiens",
    "iguana-iguana",
    "iguanodon-bernissartensis",
    "loxodonta-africana",
    "megaptera-novaeangliae",
    "mellisuga-helenae",
    "odobenus-rosmarus",
    "ophiophagus-hannah",
    "orcinus-orca",
    "ovis-aries",
    "panthera-leo",
    "panthera-onca",
    "panthera-pardus",
    "panthera-tigris",
    "phoebetria-fusca",
    "pongo-abelii",
    "pteranodon-longiceps",
    "pterois-mombasae",
    "salmo-salar",
    "sphyrna-mokarran",
    "spinosaurus-aegyptiacus",
    "stegosaurus-stenops",
    "triceratops-horridus",
    "trilobita",
    "tursiops-truncatus",
    "tyrannosaurus-rex",
    "ursus-arctos-horribilis",
    "ursus-maritimus",
    "varanus-komodoensis"
]

const setSpecies = () => {
    let ul = document.getElementById("possible-species")
    classes.forEach(class_ => {
        const name = translation[class_]
        const element = document.createElement("li")
        element.innerHTML = name
        element.className="list-group-item"
        ul.appendChild(element)
    })
}

async function main() {
    const model = await loadModel();
    setSpecies();
    file_upload.addEventListener("change", async (ev) => {
        let files = ev.target.files;
        document.getElementById("loading-indicator").className = "card-body d-block"
        for (let i = 0, f; f = files[i]; i++) {
            let reader = new FileReader();
            const idx = i;
            // Closure to capture the file information.
            reader.onload = e => {
                // Fill the image & call predict.
                let img = document.getElementById('image');
                img.src = e.target.result;
                img.onload = async () => {
                    let result = await predict(model, img);
                    document.getElementById("answer").innerHTML = result;
                    document.getElementById("common-name").innerHTML = translation[result];
                    document.getElementById("loading-indicator").className = "card-body d-none"
                }
            };

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    })
}

main()