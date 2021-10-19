import * as tf from '@tensorflow/tfjs';

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

export const loadModel = async () => {
    let model = await tf.loadGraphModel("https://raw.githubusercontent.com/SharanSMenon/ml-models/master/animal_model/animal-js/model.json")
    return model
}

export const predict = async (model, image) => {
    const img = tf.browser.fromPixels(image).
        resizeNearestNeighbor([224, 224])
        .div(255)
        .sub([0.485, 0.456, 0.406])
        .div([0.229, 0.224, 0.225])
        .transpose([2, 0, 1])
        .expandDims()
    const inputs = tf.cast(img, "float32")
    let predictions = await model.executeAsync(inputs)
    console.log(predictions.arraySync()[0])
    return classes[tf.argMax(predictions.arraySync()[0]).arraySync()]

}