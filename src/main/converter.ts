export class Converter {
  convert(input: number): string {
    return this.mChecker(input);
  }

  vChecker(input: number): string {
    if (input === 4) {
      return 'IV';
    }
    if (input === 9) {
      return 'IX';
    }

    let output = '';

    if (input >= 5) {
      output = 'V';
    }

    const remainder = input % 5;

    if (remainder === 1) {
      return output.concat('I');
    } else if (remainder === 2) {
      return output.concat('II');
    } else if (remainder === 3) {
      return output.concat('III');
    }
    return output;
  }

  xChecker(input: number): string {
    let output = '';
    const remainder = input % 10;

    if (input >= 10 && input < 40) {
      let xCount = (input - remainder) / 10;

      while (xCount > 0) {
        output = output.concat('X');
        xCount--;
      }
    }
    return output.concat(this.vChecker(remainder));
  }

  lChecker(input: number): string {
    let output = '';
    const lRemainder = input % 50;
    const xRemainder = lRemainder % 40;
    if (input - xRemainder === 40) {
      output = 'XL';
    }

    if (input >= 50 && input < 90) {
      output = 'L';
    }

    return output.concat(this.xChecker(xRemainder));
  }

  cChecker(input: number): string {
    let output = '';
    const remainder = input % 100;

    output = this.xcChecker(input);

    if (input >= 100 && input < 400) {
      let xCount = (input - remainder) / 100;

      while (xCount > 0) {
        output = output.concat('C');
        xCount--;
      }
      output = output.concat(this.xcChecker(remainder));
    }
    return output.concat(this.lChecker(remainder));
  }

  xcChecker(input: number): string {
    let output = '';
    if (input >= 90 && input < 100) {
      output = 'XC';
    }
    return output;
  }

  dChecker(input: number): string {
    let output = '';
    const lRemainder = input % 500;
    const xRemainder = lRemainder % 400;
    if (input - xRemainder === 400) {
      output = 'CD';
    }

    if (input >= 500 && input < 900) {
      output = 'D';
    }

    return output.concat(this.cChecker(xRemainder));
  }

  mChecker(input: number): string {
    let output = '';
    const remainder = input % 1000;

    output = this.cmChecker(input);

    if (input >= 1000 && input < 4000) {
      let xCount = (input - remainder) / 1000;

      while (xCount > 0) {
        output = output.concat('M');
        xCount--;
      }
      output = output.concat(this.cmChecker(remainder));
    }
    return output.concat(this.dChecker(remainder));
  }

  cmChecker(input: number): string {
    let output = '';
    if (input >= 900 && input < 1000) {
      output = 'CM';
    }
    return output;
  }
}
