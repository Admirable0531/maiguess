const { parseChart } = require('./majdataParser');

parseChart((err, chart) => {
    if (err) {
        console.error('Failed to parse chart:', err);
        return;
    }

    console.log(chart.chart); // Now you can use the chart object
    
    class SimaiNote {
        constructor() {
            this.holdTime = 0; // hold time
            this.isBreak = false; // break flag
            this.isEx = false; // ex flag
            this.isFakeRotate = false; // fake rotate flag
            this.isForceStar = false; // force star flag
            this.isHanabi = false; // hanabi flag
            this.isSlideBreak = false; // slide break flag
    
            this.noteContent = ''; // used for star explain
            this.noteType = null; // placeholder for note type (could be an enum or class)
    
            this.slideStartTime = 0; // slide start time
            this.slideTime = 0; // slide time
    
            this.startPosition = 1; // key position (1-8)
            this.touchArea = ' '; // touch area
        }
    }

    const chartSplit = chart.chart.split(",");
    const notes = [];
    let bpm = "";
    let beatDiv = "";
    let songPos = 0;
    const sliderPatterns = /[-^<>vszpqVw]/;

    for (let i = 0; i < 10; i++) {
        let isBreak = false;
        let isEx = false;
        console.log(chartSplit[i]);
        // Match values inside curly braces
        const beatDivMatches = chartSplit[i].match(/\{([^}]*)\}/g);
        // Match values inside parentheses
        const bpmMatches = chartSplit[i].match(/\(([^)]*)\)/g);
        // Extract and clean values inside parentheses
        if (bpmMatches) {
            bpm = bpmMatches[0].replace(/[()]/g, ''); // Remove parentheses
        }
        // Extract and clean values inside curly braces
        if (beatDivMatches) {
            beatDiv = beatDivMatches[0].replace(/[{}]/g, ''); // Remove curly braces
        }
        if(chartSplit[i].includes('x')){
            isEx = true;
        }
        if(chartSplit[i].includes('b')){
            isBreak = true;
        }
        if(chartSplit[i].includes('-')){
            isBreak = true;
        }
        if(sliderPatterns.test(chartSplit[i])){
            
        }


        notes.push(new SimaiNote({
            holdTime: 2.5,
            isBreak: isBreak,
            noteContent: 'First note',
            noteType: 'type1',
            slideStartTime: 1.0,
            slideTime: 3.0,
            startPosition: 4,
            touchArea: 'A'
        }));
    }
    


    // for (let i = 0; i < 100; i++) {
    //     const char = chart.chart[i]; // Access the character at index i
    //     if(bpmChange){
    //         if(char == ")") {
    //             bpmChange = false;
    //             console.log("bpm: " + bpm)
    //         } else {
    //             bpm = bpm + char;
    //         }
    //     }
    //     if(char == "("){
    //         bpmChange = true;
    //         bpm = "";
    //     }
    //     if(beatDividing){
    //         if(char == "}") {
    //             beatDividing = false;
    //             console.log("beat: " + beatDiv)
    //         } else {
    //             beatDiv = beatDiv + char;
    //         }

    //     }
    //     if(char == "{"){
    //         beatDividing = true;
    //         beatDiv = "";
    //     }
    //     if(char == ","){
    //         songPos += (parseFloat(bpm) / 60) / beatDiv;
    //         console.log(songPos)
    //     }
    //     if(char == "A" || char == "B" || char == "E" || char == "D" || char == "C"){
    //         touch = char + chart.chart[i+1];
    //         i += 1;
    //         songPos += (parseFloat(bpm) / 60) / beatDiv;
    //         console.log(`touch: ${touch} pos: ${songPos}`);
    //     }
    //     if(char == "/"){
    //         songPos -= (parseFloat(bpm) / 60) / beatDiv;
    //     }
    //     if(char == "1" || char == "2" || char == "3" || char == "4" || char == "5" || char == "6" || char == "7" || char == "8"){
    //         if(chart.chart[i+1] == "x"){
    //             if(chart.chart[i+2] == "h"){
                
    //             }
    //         }
    //         if(chart.chart[i+1] == "h"){
                
    //         }
    //     }
    // }
});
