const spellAnIntInItalian = int => {
    let oneHundredAndEighty;
    mono = new Array(
        "",
        "uno",
        "due",
        "tre",
        "quattro",
        "cinque",
        "sei",
        "sette",
        "otto",
        "nove"
    );
    double = new Array(
        "dieci",
        "undici",
        "dodici",
        mono[3] + "dici",
        "quattordici",
        "quindici",
        "sedici",
        "dicias" + mono[7],
        "dici" + mono[8],
        "dician" + mono[9]
    );
    deca = new Array(
        "",
        double[0],
        "venti",
        mono[3] + "nta",
        "quaranta",
        "cinquanta",
        "sessanta",
        "settanta",
        "ottanta",
        "novanta"
    );
    hundred = new Array("cent", "cento");
    mili = new Array();
    mili[0] = new Array(
        "",
        "mille",
        "milione",
        "miliardo",
        "bilione",
        "biliardo"
    );
    mili[1] = new Array("", "mila", "milioni", "miliardi", "bilioni", "biliardi");
    text = new Array();
    digit = new Array();
    result = "";
    section = 0;
    oneHundredAndEighty = oneHundredAndEighty || false;
    if (isNaN(int)) {
        return "This is not an integer. Try again...";
    } else if (/\u002B/.test(int)) {
        return spellAnIntInItalian(int.replace(/\u002B/, ''));
    }
    int += "";
    while (int.substring(0, 1) == "0" && int.length != 1) {
        int = int.substring(1, int.length + 1);
    }
    num = parseInt(int);
    switch (int.length % 3) {
        case 1:
            int = "00" + int;
            break;
        case 2:
            int = "0" + int;
    }
    intlen = int.length;
    if (isNaN(num)) {
        return "This is not an integer. Try again...";
    } else if (num < 0) {
        return "Negative number is not allowed. Try again...";
    } else if (num == 0) {
        return "zero";
    } else if (intlen > 6 * 3) {
        return "Limit exceeded!";
    }
    while ((section + 1) * 3 <= intlen) {
        subnumberstring = int.substring(
            intlen - 1 - (section + 1) * 3 + 1,
            intlen - 1 - (section + 1) * 3 + 4
        );
        if (subnumberstring != "000") {
            subnumber = parseInt(subnumberstring);
            digit[0] = subnumberstring.substring(0, 1);
            digit[1] = subnumberstring.substring(1, 2);
            digit[2] = subnumberstring.substring(2, 3);
            first2digits = parseInt(digit[1] * 10) + parseInt(digit[2]);
            if (first2digits < 10) {
                text[2] = mono[digit[2]];
                text[1] = "";
            } else if (first2digits < 20) {
                text[2] = "";
                text[1] = double[first2digits - 10];
            } else {
                if (section == 0 && digit[2] == 3) {
                    text[2] = "tré";
                } else {
                    text[2] = mono[digit[2]];
                }
                if (digit[2] == 1 || digit[2] == 8) {
                    text[1] = deca[digit[1]].substring(0, deca[digit[1]].length - 1);
                } else {
                    text[1] = deca[digit[1]];
                }
            }
            if (digit[0] == 0) {
                text[0] = "";
            } else {
                if (
                    (!oneHundredAndEighty && digit[1] == 8) ||
                    (digit[1] == 0 && digit[2] == 8)
                ) {
                    IDcent = 0;
                } else {
                    IDcent = 1;
                }
                if (digit[0] != 1) {
                    text[0] = mono[digit[0]] + hundred[IDcent];
                } else {
                    text[0] = hundred[IDcent];
                }
            }
            subnumber == 1 && section != 0
                ? section >= 2
                    ? (result = "un" + mili[0][section] + result)
                    : (result = mili[0][section] + result)
                : (result = text[0] + text[1] + text[2] + mili[1][section] + result);
        }
        section++;
    }
    return result;
};

export default spellAnIntInItalian;
