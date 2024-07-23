enum LonoSoftwareSerialVar {
    mySerial1,
    mySerial2,
    mySerial3,
    mySerial4,
    mySerial5,
}

enum DataType {
    //% block="string"
    STRING,
    //% block="hex"
    HEX,
}

enum ChangeLine {
    //% block="Wrap"
    NEWLINE,
    //% block="No Wrap"
    NONEWLINE,
}


//% color="#00CD66" iconWidth=50 iconHeight=40
namespace LonoSoftSerial {
    //% block="init SoftwareSerial [SS]; TX=[TX], RX=[RX], BAUD=[BAUD]" blockType="command"
    //% SS.shadow="dropdown" SS.options="LonoSoftwareSerialVar" SS.defl="LonoSoftwareSerialVar.mySerial1"
    //% TX.shadow="normal" TX.defl="2"
    //% RX.shadow="normal" RX.defl="3"
    //% BAUD.shadow="number" BAUD.defl=9600
    export function initSoftSerial(parameter: any, block: any) {
        let SS = parameter.SS.code;
        let TX = parameter.TX.code;
        let RX = parameter.RX.code;
        let BAUD = parameter.BAUD.code;
        Generator.addInclude('includeSoftSerial', '#include <SoftwareSerial.h>');
        Generator.addObject('objectSoftwareSerial', 'SoftwareSerial', `${SS}(${RX}, ${TX});`);
        Generator.addSetup('setupSoftwareSerial', `${SS}.begin(${BAUD});`);
    }

    //% block="Whether data is readable over the serial port [SS]" blockType="boolean"
    //% SS.shadow="dropdown" SS.options="LonoSoftwareSerialVar" SS.defl="LonoSoftwareSerialVar.mySerial1"
    export function available(parameter: any, block: any) {
        let SS = parameter.SS.code;
        Generator.addCode(`${SS}.available()`);
    }

    //% block="Read data(one char) from the serial port [SS]" blockType="reporter"
    //% SS.shadow="dropdown" SS.options="LonoSoftwareSerialVar" SS.defl="LonoSoftwareSerialVar.mySerial1"
    export function read(parameter: any, block: any) {
        let SS = parameter.SS.code;
        // convert to string
        Generator.addCode(`String(char(${SS}.read()))`);
    }

    //% block="Read data(one number) from the serial port [SS]" blockType="reporter"
    //% SS.shadow="dropdown" SS.options="LonoSoftwareSerialVar" SS.defl="LonoSoftwareSerialVar.mySerial1"
    export function readNumber(parameter: any, block: any) {
        let SS = parameter.SS.code;
        Generator.addCode(`${SS}.read()`);
    }

    //% block="SoftwareSerial [SS], Write data [DATATYPE] [DATA], [NEWLINE]" blockType="command"
    //% DATATYPE.shadow="dropdown" DATATYPE.options="DataType" DATATYPE.defl="DataType.STRING"
    //% DATA.shadow="string" DATA.defl="Hello"
    //% SS.shadow="dropdown" SS.options="LonoSoftwareSerialVar" SS.defl="LonoSoftwareSerialVar.mySerial1"
    //% NEWLINE.shadow="dropdown" NEWLINE.options="ChangeLine" NEWLINE.defl="ChangeLine.NONEWLINE"
    export function write(parameter: any, block: any) {
        let DATATYPE = parameter.DATATYPE.code;
        let DATA = parameter.DATA.code;
        let SS = parameter.SS.code;
        let NEWLINE = parameter.NEWLINE.code;
        if (DATATYPE == 'STRING') {
            Generator.addCode(`${SS}.print(${DATA});`);
        } else if (DATATYPE == 'HEX') {
            Generator.addCode(`${SS}.print(${DATA}, HEX);`);
        }

        if (NEWLINE == 'NEWLINE') {
            Generator.addCode(`${SS}.println();`);
        }
    }
}
