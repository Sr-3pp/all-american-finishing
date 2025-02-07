const fs2 = require('fs');
const path2 = require('path')
const dir : string = path2.join(__dirname, "../assets/")

if (!fs2.existsSync(dir)) {
    fs2.mkdirSync(dir);
}

//------Import Tokens

const color = require("../tokens/src/color.json");
const breakpoint = require("../tokens/src/breakpoint.json");
const size = require("../tokens/src/size.json");
const font = require("../tokens/src/font.json");

const inputs : any[] = [
    color,
    breakpoint,
    size,
    font
];


//-----Utilities

let paths: string[] = [];

const toRem = (value: string) => {
    return (parseInt(value) / 16).toString() + "rem";
}

const transformValue = (cat: string, value: string) => {

    switch (cat) {
        case "size":
        case "font":
            let isnum = /^\d+$/.test(value);
            if (isnum) {
                return toRem(value);
            }else{
                return "'" + value + "'";
            }

        case "time":
            return value + "s";
    
        default:            
            return value;
    }
}

const buildPaths = (object: any) => {
    const iter = (o: any, p: string[]) => {
        if (o && typeof o === 'object') {
            Object.keys(o).forEach(function (k) {
                let val: string[];
                if (k != "value") {
                    val = p.concat(k);
                }else{
                    val =  p.concat("=");
                }
                if (k != "description") {
                    iter(o[k], val);
                }
            });
            return;
        }
        p.push(o);
        paths.push(p.join('|'));
        
    }

    iter(object, []);
    return paths;
}

const makeFile2 = async (items: string[], url: string, format: string) => {
    const fileName = path2.join(dir, url) + '/tokens.' + format

    if (!fs2.existsSync(path2.join(dir, format))) {
        fs2.mkdirSync(path2.join(dir, format));
    }

    var file = await fs2.createWriteStream(fileName);
    file.on('error', (err: any) => { console.log(err)});
    items.forEach((v: any) => { file.write(v + '\n'); });
    file.end();
}

const formatString = (s: string, format: string) => {
    switch (format) {
        case "kebab":
            let str2 : string = s.replace(/\|/g, "-").replace("-=-", "=");
            return str2;
    
        case "camel":
            let str: string[] = s.replace(/-/g, "|").split("|");
            for (let i = 1; i < str.length; i++) {
                const element = str[i];
                str[i] = element.charAt(0).toUpperCase() + element.slice(1) 
            }

            return str.join("");
        default:
            return s;
    }
}

//----Main functions

const toScss = (elements: any[], caseStyle: string = "kebab") => {    
    let scssVars: string[] = [];

    const buildVars = () => {
        paths.forEach((s: any) => {
            let str : string = formatString(s, caseStyle);
            let strArr: string[] = str.split("=");
            strArr[1] = transformValue(strArr[0].split("-")[0], strArr[1]);
            scssVars.push("$" + strArr.join("=").replace("=", ": ") + ";");
        })
        paths = []
    }
        
 
    elements.forEach((e: any) => {
        buildPaths(e);
    });


    buildVars();
    makeFile2(scssVars, "scss", "scss");
    
}

const toJs = (elements: any[], caseStyle: string = "camel") => {    
    let jsVars: string[] = [];

    const isStringValue = (s: string) => {
        let arr = s.split("=");
        let isnum = /^\d+$/.test(arr[1]);
        
        if (!isnum) {            
            if (!arr[1].includes("'")) {
                arr[1] = "'" + arr[1] + "'";
            }
        }

        arr[0] = arr[0].replace(/-/gi, "");
        
        return arr.join("= ");
        
    }

    const buildVars = () => {
        paths.forEach((s: any) => {
            let kstr: string = formatString(s, 'kebab');
            let str : string = formatString(s, caseStyle);
            const kstrArr = kstr.split("=");
            let strArr: string[] = str.split("=");
            strArr[1] = transformValue(kstrArr[0].split("-")[0], strArr[1]);
            jsVars.push('export const ' + isStringValue(strArr.join("=")) + ';');
        })
        paths = [];
    }
    
 
    elements.forEach((e: any) => {
        buildPaths(e);
    });


    buildVars();
    makeFile2(jsVars, "ts", "ts");
    
}

const toJSON = (elements: any[]) => {
    let fullObj: any = {};

   const mergePaths = (target: any, source: any) => {
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object && key in target) Object.assign(source[key], mergePaths(target[key], source[key]))
        }

        Object.assign(target || {}, source)
        return target
   }

    const setValue = (object: any, path: string, value: string) => {
        var keys = path.split('|'),
        last: any = keys.pop();
        
        keys.reduce(function (o: any, k: any) { return o[k] = o[k] || {}; }, object)[last] = value;
    }
    
    const buildVars = () => {
        paths.forEach((s: any) => {
            const data = {};
            
            const p = s.replace("|=|", "=");
            const path = p.split("=");
            const properties = path[0].split("|")
            
            const val = path[1];
            const value = transformValue(properties[0], val);
            
            setValue(data, properties.join('|'), value);
            mergePaths(fullObj, data);
        })        
        paths = [];
    }

    elements.forEach((e: any) => {
        buildPaths(e);
    });
    

    buildVars();

    fs2.writeFileSync(dir + "/tokens.json", JSON.stringify(fullObj, null, 2));
    
}

//----Start functions

toScss(inputs);
toJs(inputs);
toJSON(inputs);