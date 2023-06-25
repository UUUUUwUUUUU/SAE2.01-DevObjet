

const input = `
<path
style="display:inline;fill:none;stroke:#000000;stroke-opacity:1"
d="m 4207.0964,2792.1498 c 0,0 -102.0516,-102.7485 -106.8567,-107.4972 -3.0122,-2.9769 -13.0807,-9.5532 -17.3151,-9.6291 -2.7987,-0.05 -70.0408,-0.058 -70.0408,-0.058"
id="path8585"
sodipodi:nodetypes="cssc"
inkscape:label="BoissyStLeger-Vincennes" />
<path
style="display:none;fill:none;stroke:#000000;stroke-opacity:1"
d="m 3491.9745,2646.6598 c 0,0 15.5763,15.5254 23.3259,20.369 6.5217,4.0762 14.0011,7.52 21.6832,7.8848 20.5856,0.9775 477.0295,0 477.0295,0"
id="path407"
inkscape:label="Vincennes-Nation" />
<path
style="display:none;fill:none;stroke:#000000;stroke-opacity:1"
d="m 3042.2133,2900.6156 c 0,0 7.3845,8.1852 19.7119,16.0981 3.7275,2.3927 12.2635,2.0262 18.3978,-5.5851 8.4086,-10.4331 311.3099,-314.776 318.6768,-320.3194 9.8006,-7.3746 27.4678,-7.964 36.7957,0 2.3974,2.0468 25.1191,24.7338 40.9203,40.5544 8.6715,8.6821 15.2587,15.2962 15.2587,15.2962"
id="path405"
sodipodi:nodetypes="csssssc"
inkscape:label="Nation-GareDeLyon" />
<path
style="display:none;fill:none;stroke:#000000;stroke-opacity:1"
d="m 2389.0901,2300.3863 c 0,0 31.6565,0.5463 43.3664,0 7.7599,-0.362 16.3247,2.9174 21.6831,8.5418 6.9401,7.2847 588.0737,591.6875 588.0737,591.6875"
id="path403"
inkscape:label="GareDeLyon-Chatelet" />
<path
style="display:none;fill:none;stroke:#000000;stroke-opacity:1"
d="m 1818.7573,2021.1335 c 0,0 37.317,0.9854 61.1071,1.3141 9.8963,0.1367 15.7309,1.4346 23.9829,6.8991 9.4292,6.2441 251.8494,256.5943 259.2123,262.4977 6.0003,4.8109 13.9961,8.1216 21.6832,7.8848 18.1126,-0.5581 204.3473,0.6571 204.3473,0.6571"
id="path401"
inkscape:label="Chatelet-Auber" />
<path
style="display:none;fill:none;stroke:#000000;stroke-opacity:1"
d="m 1158.4065,1869.3513 c 0,0 137.3342,139.5233 145.8685,145.8686 6.0069,4.4662 13.5538,7.4433 21.0261,7.8848 7.4952,0.4429 493.4562,-1.9712 493.4562,-1.9712"
id="path399"
inkscape:label="Auber-CDGEtoile" />
<path
style="display:none;fill:none;stroke:#000000;stroke-opacity:1"
d="m 602.52906,1312.8169 555.87744,556.5344"
id="path397"
inkscape:label="CDGEtoile-LaDefense" />
<path
style="display:none;fill:none;stroke:#000000;stroke-opacity:1"
d="m 206.71176,1226.1202 c 0,0 132.80506,-5.2757 250.09023,0.1285 59.78114,2.7546 103.97262,62.5707 146.7335,87.6838"
id="path8583"
sodipodi:nodetypes="csc"
inkscape:label="LaDefense-StGermainEnLaye" />
`;

const lines = input.split('<path');
const troncons = [];

lines.forEach(line => {
    if (line.trim() !== '') {
        let id = line.match(/inkscape:label="([^"]+)"/)[1];
        const d = line.match(/d="([^"]+)"/)[1];

        // reverse id order 
        id = id.split('-').reverse().join('-');



        const troncon = {
            id,
            d,
            beginStation: -1,
            endStation: -1
        };

        troncons.push(troncon);
    }
});


// reverse the order of the troncons
troncons.reverse();


// check that the for each troncon, the end station is the same as the begin station of the next troncon
for (let i = 0; i < troncons.length - 1; i++) {

    const troncon = troncons[i];
    const nextTroncon = troncons[i + 1];

    const tronconEndStation = troncon.id.split('-')[1];
    const nextTronconBeginStation = nextTroncon.id.split('-')[0];

    if (tronconEndStation !== nextTronconBeginStation) {
        console.log(troncon.id, nextTroncon.id);
        console.log('error');
        // exit
        process.exit(1);
    }
}


const output = {
    troncons
};

const fs = require('fs');

console.log(JSON.stringify(output, null, 4));

// write the output to a file
fs.writeFileSync('RERABoissy-StGermain.json', JSON.stringify(output, null, 4));